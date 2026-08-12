#!/usr/bin/env python3
"""Build a review queue from automated transcripts of the Nolan Wells scanner archive.

This script does not publish claims. It finds candidate passages, preserves nearby
context, and records why each passage was selected for human listening review.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path


LINE = re.compile(
    r"^\[(?P<absolute>[^|]+) \| \+(?P<start>[^ ]+) --> \+(?P<end>[^\]]+)\] (?P<text>.*)$"
)
WEIGHTED_PATTERNS = {
    r"\bnolan(?:\s+wells)?\b": (20, "Nolan name"),
    r"\bhorn\s+island\b": (16, "Horn Island"),
    r"\bsignal\s+80\b": (8, "signal 80"),
    r"\bmissing\s+(?:person|subject|juvenile|male|man)\b": (9, "missing subject"),
    r"\bblack\s+(?:swim|swimming)\s+shorts\b": (12, "clothing description"),
    r"\blight[- ]skinned?\s+black\s+male\b": (12, "physical description"),
    r"\bboat\s+(?:launch|ramp|pier|dock)s?\b": (5, "waterfront search location"),
    r"\blake\s+mars\b": (8, "Lake Mars"),
    r"\bcoast\s+guard\b": (8, "Coast Guard"),
    r"\bmarine\s+resources\b|\bM\.?D\.?M\.?R\.?\b|\bD\.?M\.?R\.?\b": (8, "MDMR/DMR"),
    r"\bnew\s+information\b.{0,100}\bassist\b.{0,100}\b(?:county|D\.?M\.?R\.?)\b": (8, "new information for county/DMR"),
    r"\bsearch(?:ing)?\b": (3, "search"),
    r"\bbody\s+(?:found|located|recovered)\b": (14, "body recovery"),
    r"\bdeceased(?:\s+person)?\b|\bcoroner\b": (12, "deceased/coroner"),
    r"\bnational\s+park\s+service\b|\bpark\s+ranger\b": (9, "NPS/ranger"),
    r"\bharass(?:ing|ment|ed)\b.{0,80}\bboat\b|\bboat\b.{0,80}\bharass": (8, "boat harassment report"),
    r"\bel\s+camino\s+(?:real|rial)\b": (12, "El Camino launch/report location"),
    r"\bdog\s+key(?:s)?\s+pass\b": (14, "Dog Keys Pass"),
    r"\b(?:east|west)(?:ern)?\s+(?:end|tip)\b": (7, "island end/tip"),
    r"\bair\s*1\b|\baerial\s+(?:unit|search)\b": (7, "aerial search unit"),
    r"\bon\s+the\s+water\b": (5, "water deployment"),
    r"\bboats?\s+tied\b": (8, "boats tied near search area"),
    r"\blast\s+(?:seen|known)\b.{0,80}\b(?:island|area)\b": (8, "last-seen area"),
    r"\bnegative\s+contact\b.{0,80}\b(?:air|island|boat|pier|ramp)\b": (7, "negative search contact"),
    r"\bparents?\b.{0,100}\b(?:vehicle|car|family|house)\b": (6, "family/vehicle status"),
    r"\bsame\s+(?:case|call)\s+number\b": (6, "continued incident record"),
    r"\b18[- ]year[- ]old\s+son\b": (12, "18-year-old son missing report"),
    r"\bMcDonald'?s\b.{0,100}\bOcean\s+Springs\b": (8, "Ocean Springs reporting location"),
    r"\blast\s+seen\b.{0,80}\b3\b.{0,80}\bisland\b": (10, "3 p.m. island last-seen report"),
}


@dataclass
class TranscriptLine:
    absolute: str
    start: str
    end: str
    text: str


@dataclass
class Candidate:
    source_file: str
    score: int
    reasons: list[str]
    absolute_time: str
    relative_start: str
    relative_end: str
    matched_text: str
    context: list[dict]


def parse_transcript(path: Path) -> list[TranscriptLine]:
    records = []
    for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = LINE.match(raw)
        if match:
            records.append(TranscriptLine(**match.groupdict()))
    return records


def score(text: str) -> tuple[int, list[str]]:
    value = 0
    reasons = []
    for pattern, (weight, reason) in WEIGHTED_PATTERNS.items():
        if re.search(pattern, text, flags=re.I):
            value += weight
            reasons.append(reason)
    return value, reasons


def collect(transcript_dir: Path, threshold: int, context_size: int) -> list[Candidate]:
    candidates = []
    for path in sorted(transcript_dir.glob("*.txt")):
        rows = parse_transcript(path)
        for index, row in enumerate(rows):
            value, reasons = score(row.text)
            if value < threshold or "Unintelligible / low-confidence" in row.text:
                continue
            begin = max(0, index - context_size)
            finish = min(len(rows), index + context_size + 1)
            context = [asdict(item) for item in rows[begin:finish]]
            candidates.append(Candidate(
                source_file=path.name.replace(".txt", ".mp3"),
                score=value,
                reasons=reasons,
                absolute_time=row.absolute.strip(),
                relative_start=row.start,
                relative_end=row.end,
                matched_text=row.text,
                context=context,
            ))
    return sorted(candidates, key=lambda item: (item.absolute_time, -item.score, item.source_file))


def render_markdown(candidates: list[Candidate], reviewed_files: int) -> str:
    lines = [
        "# Dispatch transcript candidate review queue",
        "",
        f"Generated: {datetime.now().isoformat(timespec='seconds')}",
        f"Transcript files scanned: {reviewed_files}",
        f"Candidate lines: {len(candidates)}",
        "",
        "Automated candidate selection only. A match is not a case event until the audio and context are reviewed.",
        "",
    ]
    for item in candidates:
        lines.extend([
            f"## {item.absolute_time} · score {item.score}",
            "",
            f"- Source: `{item.source_file}`",
            f"- Offset: `{item.relative_start}`–`{item.relative_end}`",
            f"- Reasons: {', '.join(item.reasons)}",
            f"- Match: {item.matched_text}",
            "",
            "Context:",
            "",
        ])
        lines.extend(f"- `{line['absolute'].strip()}` {line['text']}" for line in item.context)
        lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("transcript_dir", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--threshold", type=int, default=7)
    parser.add_argument("--context", type=int, default=2)
    args = parser.parse_args()

    reviewed_files = len(list(args.transcript_dir.glob("*.metadata.json")))
    candidates = collect(args.transcript_dir, args.threshold, args.context)
    args.output.mkdir(parents=True, exist_ok=True)
    payload = {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "transcriptFilesScanned": reviewed_files,
        "candidateCount": len(candidates),
        "notice": "Automated review queue only; listen to source audio before publication.",
        "candidates": [asdict(candidate) for candidate in candidates],
    }
    (args.output / "dispatch-candidates.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    (args.output / "dispatch-candidates.md").write_text(render_markdown(candidates, reviewed_files), encoding="utf-8")
    print(f"Scanned {reviewed_files} transcripts; wrote {len(candidates)} candidate lines to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

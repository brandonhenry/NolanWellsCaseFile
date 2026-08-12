#!/usr/bin/env python3
"""Verify preserved dispatch clips against the public machine-readable ledger."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def duration(path: Path, ffprobe: str) -> float:
    result = subprocess.run(
        [ffprobe, "-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", str(path)],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--ledger", type=Path, default=Path("documents/dispatch-audio-ledger.json"))
    parser.add_argument("--source-archive", type=Path)
    parser.add_argument("--ffprobe", default="ffprobe")
    args = parser.parse_args()

    root = args.root.resolve()
    ledger_path = args.ledger if args.ledger.is_absolute() else root / args.ledger
    payload = json.loads(ledger_path.read_text(encoding="utf-8"))
    segments = payload.get("segments", [])
    errors: list[str] = []
    seen: set[str] = set()
    verified_sources = 0

    for segment in segments:
        segment_id = segment.get("id", "<missing id>")
        if segment_id in seen:
            errors.append(f"{segment_id}: duplicate id")
        seen.add(segment_id)

        clip_path = root / segment["clipPath"].lstrip("/")
        if not clip_path.is_file():
            errors.append(f"{segment_id}: missing clip {clip_path}")
            continue

        actual_hash = sha256(clip_path)
        if actual_hash != segment.get("clipSha256"):
            errors.append(f"{segment_id}: clip SHA-256 mismatch")

        try:
            actual_duration = duration(clip_path, args.ffprobe)
        except (subprocess.CalledProcessError, ValueError) as exc:
            errors.append(f"{segment_id}: unreadable audio ({exc})")
            continue
        expected_duration = float(segment.get("clipDurationSeconds", -1))
        if abs(actual_duration - expected_duration) > 0.15:
            errors.append(
                f"{segment_id}: duration {actual_duration:.3f}s does not match ledger {expected_duration:.3f}s"
            )

        offsets = segment.get("relevantSourceOffsetSeconds")
        if not isinstance(offsets, list) or len(offsets) != 2 or offsets[0] > offsets[1]:
            errors.append(f"{segment_id}: invalid relevant source offsets")

        if args.source_archive and not segment.get("sourceFile", "").startswith("PLUNDER embedded clip"):
            source_path = args.source_archive / segment["sourceFile"]
            if not source_path.is_file():
                errors.append(f"{segment_id}: missing original source {source_path}")
            elif sha256(source_path) != segment.get("sourceSha256"):
                errors.append(f"{segment_id}: original source SHA-256 mismatch")
            else:
                verified_sources += 1
                try:
                    source_duration = duration(source_path, args.ffprobe)
                    if offsets[1] > source_duration + 0.15:
                        errors.append(f"{segment_id}: relevant source offset exceeds source duration")
                except (subprocess.CalledProcessError, ValueError) as exc:
                    errors.append(f"{segment_id}: unreadable original source ({exc})")

    if errors:
        print("Dispatch audio verification failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    source_note = f"; {verified_sources} original archive sources verified" if args.source_archive else ""
    print(
        f"Verified {len(segments)} dispatch clips: unique IDs, files, hashes, durations, and offsets"
        f"{source_note}."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

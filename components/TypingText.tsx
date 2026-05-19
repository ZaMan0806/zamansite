"use client";

import { useEffect, useState } from "react";

const SEQUENCES = ["ZaMan", "Hello :)"];
const TYPE_SPEED = 120;
const DELETE_SPEED = 80;
const PAUSE_AFTER_TYPE = 2500;
const PAUSE_AFTER_DELETE = 400;

export default function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [seqIndex, setSeqIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = SEQUENCES[seqIndex];

    if (!deleting && displayed === current) {
      const pause = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(pause);
    }

    if (deleting && displayed === "") {
      const pause = setTimeout(() => {
        setSeqIndex((i) => (i + 1) % SEQUENCES.length);
        setDeleting(false);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, deleting ? DELETE_SPEED : TYPE_SPEED);

    return () => clearTimeout(timeout);
  }, [displayed, deleting, seqIndex]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-white ml-1.5 animate-pulse translate-y-[0.05em]" />
    </span>
  );
}

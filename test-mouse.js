// Test 2: full mouse tracking (1000+1002+1003+1006) like Ink does
const MOUSE_ENABLE = "\x1b[?1000h\x1b[?1002h\x1b[?1003h\x1b[?1006h";
const MOUSE_DISABLE = "\x1b[?1006l\x1b[?1003l\x1b[?1002l\x1b[?1000l";

process.stdout.write("\x1b[?1049h");
process.stdout.write("\x1b[2J\x1b[H");
process.stdout.write(MOUSE_ENABLE);

process.stdin.setRawMode(true);
process.stdin.on("data", (buf) => {
  const s = buf.toString();
  if (s.startsWith("\x1b[<") || s.startsWith("\x1b[M")) {
    process.stdout.write(`\x1b[10;1H\x1b[K EVENT: ${JSON.stringify(s.slice(0,30))}`);
  }
  if (s === "\x03") {
    process.stdout.write(MOUSE_DISABLE);
    process.stdout.write("\x1b[?1049l");
    process.stdin.setRawMode(false);
    process.exit(0);
  }
});
process.stdout.write("Scroll / click / move — events appear below. Ctrl+C to exit.\n");

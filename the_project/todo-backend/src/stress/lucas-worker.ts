function lucasRecursive(n: number): bigint {
  if (n === 0) return 2n;
  if (n === 1) return 1n;
  return lucasRecursive(n - 1) + lucasRecursive(n - 2);
}

process.on("message", (n: number) => {
  console.log("started lucas with", n);
  
  const result = lucasRecursive(n);
  console.log(`Lucas(${n}): ${result}`);

  process.send?.({ n, result: result.toString() });
  process.exit();
});

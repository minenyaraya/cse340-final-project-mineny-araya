const { execSync } = require("child_process");
const ports = process.argv.slice(2);

ports.forEach((port) => {
  try {
    const stdout = execSync(`netstat -ano | findstr :${port}`)
      .toString()
      .trim();
    if (stdout) {
      const lines = stdout.split("\n");
      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== "0") {
          try {
            execSync(`taskkill /F /PID ${pid}`);
            console.log(`Port ${port} cleared.`);
          } catch (e) {}
        }
      });
    } else {
      console.log(`Port ${port} already free.`);
    }
  } catch (error) {
    console.log(`Port ${port} is available.`);
  }
});

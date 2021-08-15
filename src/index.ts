import { generatorHandler } from "@prisma/generator-helper";
import { execSync } from "child_process";

generatorHandler({
  onManifest() {
    return {
      prettyName: "Prisma Scripts Generator",
      defaultOutput: "./",
    };
  },
  onGenerate(options) {
    return new Promise((resolve, reject) => {
      const { manager, scripts } = {
        manager: "yarn",
        scripts: "",
        ...options.generator.config,
      };

      if (!scripts) {
        throw new Error("No scripts were specified");
      }

      if (!["yarn", "npm"].includes(manager)) {
        throw new Error("Invalid manager. Possible values: 'yarn' | 'npm'");
      }

      const scriptsToRun = scripts.split(";").map((e) => e.trim());

      if (!scriptsToRun.length) {
        throw new Error(
          'Scripts not specified or malformed. Example: `scripts = "test;build;publish"`'
        );
      }

      const commands = scriptsToRun.map(
        (s) => `${manager === "npm" ? "npm run" : manager} ${s}`
      );

      try {
        commands.forEach((command) => {
          execSync(command);
        });
        resolve("Successfully ran scripts");
      } catch (error) {
        reject(new Error(`Commands '${commands}' failed.`));
      }
    });
  },
});

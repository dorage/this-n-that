import { LetsConfig } from "../src";
import type { DefaultConfig } from "./const/configs";
import { defaultConfig, zDefaultConfig } from "./const/configs";
import { isEqualObject } from "./libs/utils";

describe("load config.ts", () => {
  test("full config must parsed successfully", async () => {
    const letsconf = LetsConfig.Load<DefaultConfig>({
      file: "./test/configs/loader/fully-modified.config.ts",
      schema: defaultConfig,
      validator: (obj) => {
        return zDefaultConfig.parse(obj);
      },
    });

    expect(zDefaultConfig.strict().safeParse(letsconf.config).success).toEqual(
      true,
    );
    expect(
      isEqualObject(letsconf.config, {
        name: "dorage",
        age: 28,
        smoking: false,
        nationality: "korea",
        job: {
          title: "jobless",
          salary: 0,
        },
        eat: () => {
          return "poo";
        },
      }),
    ).toEqual(true);
  });

  test("partially modified config must parsed successfully", async () => {
    const letsconf = LetsConfig.Load<DefaultConfig>({
      file: "./test/configs/loader/partially-modified.config.ts",
      schema: defaultConfig,
      validator: (obj) => {
        return zDefaultConfig.parse(obj);
      },
    });
    const partiallyModified = {
      name: "dorage",
      smoking: false,
      job: {
        title: "bagger",
        salary: 0,
      },
    };

    expect(zDefaultConfig.strict().safeParse(letsconf.config).success).toEqual(
      true,
    );
    expect(
      isEqualObject(letsconf.config, {
        ...defaultConfig,
        ...partiallyModified,
      }),
    ).toEqual(true);
  });

  test("zero modified config must parsed successfully", async () => {
    const letsconf = LetsConfig.Load<DefaultConfig>({
      file: "./test/configs/loader/blank.config.ts",
      schema: defaultConfig,
      validator: (obj) => {
        return zDefaultConfig.parse(obj);
      },
    });

    expect(zDefaultConfig.strict().safeParse(letsconf.config).success).toEqual(
      true,
    );
    expect(isEqualObject(letsconf.config, defaultConfig)).toEqual(true);
  });

  test("fully broken config must failed", async () => {
    // validation is the responsibility of the user
    try {
      const letsconf = LetsConfig.Load<DefaultConfig>({
        file: "./test/configs/loader/fully-broken.config.ts",
        schema: defaultConfig,
        validator: (obj) => {
          return zDefaultConfig.parse(obj);
        },
      });

      expect(false).toEqual(true);
    } catch (err) {
      expect(true).toEqual(true);
    }
  });

  test("partially broken config must failed", async () => {
    try {
      // validation is the responsibility of the user
      const letsconf = LetsConfig.Load<DefaultConfig>({
        file: "./test/configs/loader/partially-broken.config.ts",
        schema: defaultConfig,
        validator: (obj) => {
          return zDefaultConfig.parse(obj);
        },
      });

      expect(false).toEqual(true);
    } catch (err) {
      expect(true).toEqual(true);
    }
  });
});

import path from "path";
import { loaders } from "./libs/loaders";
import { FindFileCondition, deepReplace, findFilePath } from "./libs/utils";

// TODO: add generate function
// TODO: deploy on npm
// TODO: mutations

type SchemaObject<T extends { [key: string]: any }> = {
  [K in keyof T]: SchemaNode<T[K]> | SchemaObject<T[K]>;
};

type SchemaNode<T> = {
  default: T;
  generation?: string;
  description?: string;
  mutation?: {
    [mutationKey: string]: (value: T) => T;
  };
};

const d = Symbol("d");

const schema: SchemaObject<{
  name: string;
  age: number;
  job: { name: string; salary: number };
}> = {
  name: {
    default: "dorage lee",
    mutation: {
      lastName: (v) => v.split(" ")[0],
    },
  },
  age: { default: 28, mutation: { add: (v) => v + 1 } },
  job: { name: { default: "programmer" }, salary: { default: 2 } },
};

const schemaProxy = new Proxy(schema, {
  get(obj, key) {
    const v = obj[key as keyof typeof obj];
    if (v == null) return v;
  },
});

export type UseConfOptions<Schema> = {
  schema: Schema;
  validator?: (rawConfig: any) => Schema;
};

export class LetsConfig<Schema extends object> {
  private _options: UseConfOptions<Schema>;
  private _config!: Schema;

  // ------------------------------------------------------------
  // constructor declarations
  // ------------------------------------------------------------

  public constructor(options: UseConfOptions<Schema>) {
    this._options = options;
    this._config = options.schema;
  }

  // ------------------------------------------------------------
  // static method declarations
  // ------------------------------------------------------------

  // create instance and load config file
  static Load<Schema extends object>(
    options: UseConfOptions<Schema> & { file: FindFileCondition },
  ) {
    const instance = new LetsConfig(options);
    instance.loadConfig(options.file);
    return instance;
  }

  // ------------------------------------------------------------
  // public method declarations
  // ------------------------------------------------------------

  get config() {
    return this._config;
  }

  // load config file and merge in current config
  public loadConfig(findFileCondition: FindFileCondition) {
    this._config = deepReplace(this._config, this.load(findFileCondition));
    return this;
  }

  // merge new config in current config
  public mergeConfig(config: Partial<Schema>) {
    this._config = deepReplace(this._config, config);
    return this;
  }

  // ------------------------------------------------------------
  // private method declarations
  // ------------------------------------------------------------

  // load config file, return Partial<Schema>
  private load(findFileCondition: FindFileCondition): Partial<Schema> {
    const configPath = findFilePath(findFileCondition);

    const extension = path.extname(configPath);

    // if there has no loaders, return default config
    if (loaders[extension] == null) return {};

    const customConfig = loaders[extension](configPath);
    const validatedCustomConfig =
      this._options.validator == null
        ? customConfig
        : this._options.validator(customConfig);

    return validatedCustomConfig;
  }
}

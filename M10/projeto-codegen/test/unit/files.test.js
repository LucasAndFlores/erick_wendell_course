import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fsPromises from "fs/promises";
import { createFiles } from "../../src/createFiles.js";
import templates from "../../src/templates/index.js";

describe("#Layers - Files structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  const config = {
    layers: defaultLayers,
    mainPath: "./",
    defaultMainFolder: "src",
    componentName: "pets",
  };

  const repositoryName = `${config.componentName}Repository`;
  const serviceName = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks(), jest.clearAllMocks();
  });

  test("should not create file structure in inexistent templates", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };

    const expected = { error: "the chosen config doesnt have a template" };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
  });

  test("repository should not add any additional dependecies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });

  test("service should have repository as dependecy", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryName
    );
  });

  test("factory should have repository and service as dependecies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryName,
      serviceName
    );
  });
});

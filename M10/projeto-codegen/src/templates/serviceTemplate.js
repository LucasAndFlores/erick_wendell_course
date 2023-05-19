import Util from "../util.js";

const componentNameAnchor = "$$componentName";
const currentContextAnchor = "$$currentContext";
const repositoryAnchor = "$$repositoryName";

const template = `
export default class $$componentNameService {
  constructor({repository: $$repositoryName}) {
    this.$$repositoryName = $$repositoryName
  }

  create(data) {
    return this.$$repositoryName.create(data)
  }

  read(query) {
    return this.$$repositoryName.read(query)
  }

  update(id, data) {
    return this.$$repositoryName.update(id, data)
  }

  delete(id) {
    return this.$$repositoryName.delete(id)
  }
}`;

export function serviceTemplate(componentName, repositoryName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryAnchor, repositoryName);

  return {
    fileName: `${componentName}Service`,
    template: txtFile,
  };
}

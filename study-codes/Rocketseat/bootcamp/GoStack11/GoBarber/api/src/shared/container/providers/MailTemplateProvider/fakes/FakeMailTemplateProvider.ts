import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'MAIL CONTENT...';
  }
}

export default FakeMailTemplateProvider;

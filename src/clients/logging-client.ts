import { promises as fsPromises } from 'fs';

const LOGGING_FILE_NAME = 'bookings.log';

export class LoggingClient {
  constructor() {
    // Create the logging file if it does not exist
    fsPromises.open(LOGGING_FILE_NAME, 'a').catch();
  }

  async isFirstTimeBooked(id: string): Promise<boolean> {
    const existingIds = await this.readIdsFromFileAsync();

    if (existingIds.has(id)) {
      return false;
    }

    // Add the new ID to the Set and add write it to the file
    existingIds.add(id);
    await fsPromises.writeFile(
      LOGGING_FILE_NAME,
      Array.from(existingIds).join('\n')
    );

    return true;
  }

  private async readIdsFromFileAsync(): Promise<Set<string>> {
    const content = await fsPromises.readFile(LOGGING_FILE_NAME, 'utf-8');
    // Split the content into an array of IDs and convert to Set
    return new Set(content.trim().split('\n'));
  }
}

import fs from 'fs/promises';
import path from 'path';
import { Settings } from '@/types';

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json');

class SettingsRepository {
  async get(): Promise<Settings> {
    const raw = await fs.readFile(SETTINGS_PATH, 'utf-8');
    return JSON.parse(raw) as Settings;
  }

  async update(data: Partial<Settings>): Promise<Settings> {
    const current = await this.get();
    const updated = { ...current, ...data };
    const tmp = SETTINGS_PATH + '.tmp';
    await fs.writeFile(tmp, JSON.stringify(updated, null, 2), 'utf-8');
    await fs.rename(tmp, SETTINGS_PATH);
    return updated;
  }
}

export const settingsRepository = new SettingsRepository();

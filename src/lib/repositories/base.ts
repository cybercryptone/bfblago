import fs from 'fs/promises';
import path from 'path';

export abstract class JsonRepository<T extends { id: string }> {
  protected filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), 'data', fileName);
  }

  protected async readAll(): Promise<T[]> {
    try {
      const raw = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  }

  protected async writeAll(items: T[]): Promise<void> {
    const tmpPath = this.filePath + '.tmp';
    await fs.writeFile(tmpPath, JSON.stringify(items, null, 2), 'utf-8');
    await fs.rename(tmpPath, this.filePath);
  }

  async findAll(): Promise<T[]> {
    return this.readAll();
  }

  async findById(id: string): Promise<T | null> {
    const items = await this.readAll();
    return items.find(i => i.id === id) ?? null;
  }

  async create(item: T): Promise<T> {
    const items = await this.readAll();
    items.push(item);
    await this.writeAll(items);
    return item;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const items = await this.readAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data };
    await this.writeAll(items);
    return items[idx];
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.readAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    await this.writeAll(filtered);
    return true;
  }
}

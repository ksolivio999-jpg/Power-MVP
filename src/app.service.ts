import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testDatabase(): Promise<{ connected: boolean } | { error: string }> {
    try {
      const dataSource = this.moduleRef.get<DataSource>(getDataSourceToken(), { strict: false });
      if (!dataSource) return { error: 'DataSource provider not found' };
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
      return { connected: true };
    } catch (err: any) {
      return { error: err?.message ?? String(err) };
    }
  }
}
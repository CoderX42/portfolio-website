import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { InitService } from './init.service';

async function getMongoUri(): Promise<string> {
  const uri = process.env.MONGODB_URI;
  // 已配置远程 MongoDB 时直接使用
  if (uri && !uri.includes('localhost') && !uri.includes('127.0.0.1')) {
    return uri;
  }
  // 使用内存数据库（无本地 MongoDB 时开发友好）
  if (process.env.USE_MEMORY_MONGO === 'true') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongo = await MongoMemoryServer.create();
    console.log('[DB] Using MongoDB Memory Server (data is ephemeral)');
    return mongo.getUri();
  }
  return uri || 'mongodb://localhost:27017/portfolio_db';
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = await getMongoUri();
        return {
          uri,
          serverSelectionTimeoutMS: 5000,
        };
      },
    }),
  ],
  providers: [InitService],
})
export class DatabaseModule {}

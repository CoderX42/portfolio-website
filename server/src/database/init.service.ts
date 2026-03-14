import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const count = await this.userModel.countDocuments();
    if (count > 0) return;

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);

    await this.userModel.create({
      email,
      passwordHash,
      role: 'admin',
    });
    console.log(`[Init] Admin user created: ${email} / ${password}`);
  }
}

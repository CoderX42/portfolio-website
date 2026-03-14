import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

class ContactDto {
  @IsString()
  name!: string;
  @IsEmail()
  email!: string;
  @IsString()
  @MinLength(10, { message: '留言至少 10 个字符' })
  message!: string;
}

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  @Post()
  @ApiOperation({ summary: 'Submit contact form (dev: logs only)' })
  async submit(@Body() dto: ContactDto) {
    // 开发期仅打印，生产可存入 DB 或发送邮件
    console.log('[Contact]', dto);
    return { success: true, message: '感谢您的留言！' };
  }
}

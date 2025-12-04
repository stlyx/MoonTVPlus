import { NextResponse } from 'next/server';

import { getConfig } from '@/lib/config';

export const runtime = 'nodejs';

/**
 * GET /api/ad-filter
 * 获取自定义去广告代码配置（公开接口，无需认证）
 * 返回代码内容和版本号，客户端通过版本号判断是否需要更新缓存
 */
export async function GET() {
  try {
    const config = await getConfig();

    // 返回自定义去广告代码和版本号
    return NextResponse.json({
      code: config.SiteConfig?.CustomAdFilterCode || '',
      version: config.SiteConfig?.CustomAdFilterVersion || 0,
    });
  } catch (error) {
    console.error('获取去广告代码配置失败:', error);
    return NextResponse.json(
      { error: '获取配置失败', details: (error as Error).message },
      { status: 500 }
    );
  }
}

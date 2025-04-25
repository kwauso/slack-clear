import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const form = await req.formData(); // Slackのリクエストはx-www-form-urlencoded

  // Slackから送られてくるパラメータを取得
  const channel = form.get('channel_id') as string;

  // 任意のメッセージ内容（例として「クリアしました」）
  const message = `\`clear\`` + '\n'.repeat(250) +`\`clear done\``;

  // Slack Botのトークンを環境変数から取得
  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

  if (!SLACK_BOT_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Bot token missing' }, { status: 500 });
  }

  // Slackにメッセージを送信
  await axios.post(
    'https://slack.com/api/chat.postMessage',
    {
      channel,
      text: message,
    },
    {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      }
    }
  );

  return NextResponse.json({ ok: true });
}

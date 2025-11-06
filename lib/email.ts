/**
 * Email notification utilities for path completions
 * This is a placeholder for future email integration
 */

export interface PathCompletionData {
  email: string;
  name: string;
  path: string;
  points: number;
  completedAt: Date;
}

/**
 * Send email notification when a user completes a path
 * TODO: Integrate with your preferred email service (SendGrid, Resend, AWS SES, etc.)
 */
export async function sendPathCompletionEmail(data: PathCompletionData): Promise<void> {
  // Log for now - replace with actual email service integration
  console.log('📧 Path Completion Email:', {
    to: data.email,
    subject: `Congratulations! You completed: ${data.path}`,
    body: `
      Hi ${data.name},
      
      Congratulations on completing the "${data.path}" path!
      You earned ${data.points} points.
      
      Completed at: ${data.completedAt.toISOString()}
      
      Keep going to unlock more paths!
    `,
  });

  // Future integration example:
  // await sendEmail({
  //   to: data.email,
  //   subject: `Path Completed: ${data.path}`,
  //   html: generateEmailTemplate(data),
  // });
}

/**
 * Generate HTML email template for path completion
 */
function generateEmailTemplate(data: PathCompletionData): string {
  const pathNames: Record<string, string> = {
    'ye-to-kar-looge-tum': 'Easy Quiz Challenge',
    'ye-nahi-kar-paaoge-tum': 'Hard Quiz Challenge',
    'swag-store': 'GARYcoin Mining Adventure',
    'angry-hr': 'HR Complaint Portal',
    'policy': 'Policy Puzzle',
    'internship': 'Internship Path',
    'stack': 'Tech Stack Explorer',
    'apply': 'Application Process',
  };

  const pathName = pathNames[data.path] || data.path;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Courier New', monospace; background: #1a1a1a; color: #fff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #2d2d2d; padding: 30px; border-radius: 10px; }
          .header { color: #ef4444; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          .content { line-height: 1.6; }
          .points { background: #22c55e; color: #000; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 15px 0; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">🎉 Path Completed!</div>
          <div class="content">
            <p>Hi <strong>${data.name}</strong>,</p>
            <p>Congratulations on completing the <strong>${pathName}</strong> path!</p>
            <div class="points">🏆 ${data.points} Points Earned</div>
            <p>Your hacking skills are impressive! Keep exploring to unlock more paths and earn even more points.</p>
            <p><strong>Completed:</strong> ${data.completedAt.toLocaleString()}</p>
          </div>
          <div class="footer">
            <p>This is an automated message from the Treasure Hunt system.</p>
            <p>Your email: ${data.email}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export { generateEmailTemplate };

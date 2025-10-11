import fs from 'fs';
import path from 'path';

// Use project root for logs directory
const LOG_DIR = process.env.LOG_DIR || path.join(process.cwd(), 'logs');

// Ensure log directory exists
try {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true, mode: 0o755 });
  }
} catch (error) {
  console.error('Failed to create log directory:', error);
}

// Get current date in YYYY-MM-DD format
function getDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get log file path with current date
function getLogFilePath(type: 'requests' | 'errors'): string {
  const dateStr = getDateString();
  return path.join(LOG_DIR, `frontend-${type}-${dateStr}.log`);
}

interface RequestLogData {
  timestamp: string;
  ip: string;
  country?: string;
  method: string;
  endpoint: string;
  query: string;
  referrer: string;
  userAgent: string;
  status?: number;
  duration?: number;
  // Cloudflare specific
  cfRay?: string;
  cfCacheStatus?: string;
  cfDeviceType?: string;
  protocol?: string;
}

interface ErrorLogData {
  timestamp: string;
  ip: string;
  endpoint: string;
  error: string;
  stack?: string;
}

export function logRequest(data: RequestLogData): void {
  const parts = [
    data.timestamp,
    `IP=${data.ip}`,
    `COUNTRY=${data.country || 'XX'}`,
    `METHOD=${data.method}`,
    `ENDPOINT=${data.endpoint}`,
    `QUERY=${data.query || ''}`,
    `STATUS=${data.status || 'N/A'}`,
    `DURATION=${data.duration ? data.duration.toFixed(3) + 's' : 'N/A'}`,
  ];

  // Add Cloudflare-specific fields if available
  if (data.cfRay) parts.push(`CF_RAY=${data.cfRay}`);
  if (data.cfCacheStatus) parts.push(`CF_CACHE=${data.cfCacheStatus}`);
  if (data.cfDeviceType) parts.push(`DEVICE=${data.cfDeviceType}`);
  if (data.protocol) parts.push(`PROTOCOL=${data.protocol}`);

  parts.push(`REFERRER=${data.referrer || '-'}`);
  parts.push(`UA=${data.userAgent || '-'}`);

  const logLine = parts.join(' | ');
  const logFile = getLogFilePath('requests');
  appendToLog(logFile, logLine);
}

export function logError(data: ErrorLogData): void {
  const logLine = [
    data.timestamp,
    `IP=${data.ip}`,
    `ENDPOINT=${data.endpoint}`,
    `ERROR=${data.error}`,
    data.stack ? `STACK=${data.stack}` : '',
  ].filter(Boolean).join(' | ');

  const logFile = getLogFilePath('errors');
  appendToLog(logFile, logLine);
}

// Buffer for batching writes (production optimization)
const logBuffer: Map<string, string[]> = new Map();
let flushTimer: NodeJS.Timeout | null = null;

function appendToLog(file: string, message: string): void {
  try {
    // In production with heavy load, buffer writes and flush periodically
    if (!logBuffer.has(file)) {
      logBuffer.set(file, []);
    }

    logBuffer.get(file)!.push(message);

    // Flush buffer if it gets too large (500 messages) or after timeout (1 second)
    if (logBuffer.get(file)!.length >= 500) {
      flushLogs(file);
    } else if (!flushTimer) {
      flushTimer = setTimeout(() => {
        flushAllLogs();
        flushTimer = null;
      }, 1000); // Flush every 1 second
    }
  } catch (error) {
    console.error('Failed to buffer log:', error);
  }
}

function flushLogs(file: string): void {
  try {
    const messages = logBuffer.get(file);
    if (messages && messages.length > 0) {
      fs.appendFileSync(file, messages.join('\n') + '\n', { mode: 0o644 });
      logBuffer.set(file, []);
    }
  } catch (error) {
    console.error('Failed to flush logs:', error);
  }
}

function flushAllLogs(): void {
  for (const file of logBuffer.keys()) {
    flushLogs(file);
  }
}

// Ensure logs are flushed on process exit
process.on('beforeExit', () => {
  flushAllLogs();
});

process.on('SIGINT', () => {
  flushAllLogs();
  process.exit();
});

process.on('SIGTERM', () => {
  flushAllLogs();
  process.exit();
});

// Cleanup old logs (optional - keeps last 30 days)
export function cleanupOldLogs(daysToKeep: number = 30): void {
  try {
    const files = fs.readdirSync(LOG_DIR);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    files.forEach(file => {
      // Match pattern: frontend-requests-YYYY-MM-DD.log or frontend-errors-YYYY-MM-DD.log
      const match = file.match(/^frontend-(requests|errors)-(\d{4}-\d{2}-\d{2})\.log$/);
      if (match) {
        const fileDate = new Date(match[2]);
        if (fileDate < cutoffDate) {
          const filePath = path.join(LOG_DIR, file);
          fs.unlinkSync(filePath);
          console.log(`Deleted old log: ${file}`);
        }
      }
    });
  } catch (error) {
    console.error('Failed to cleanup old logs:', error);
  }
}

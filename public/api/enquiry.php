<?php
// Receives the contact-form enquiry and sends two emails with PHP's mail() (works on Hostinger):
//   1. a branded notification to the company inbox (Reply-To = the visitor), and
//   2. a branded confirmation to the visitor.
// Create the mailbox below in hPanel > Emails first, otherwise delivery will fail.

const MAIL_TO   = 'shahriar@clothingtrimsintl.com';   // inbox that receives enquiries
const MAIL_FROM = 'shahriar@clothingtrimsintl.com';   // must be a mailbox on this domain
const FROM_NAME = 'Clothing Trims International';
const SITE      = 'https://clothingtrimsintl.com';
const PHONE     = '+880 1713-490067';
const WHATSAPP  = 'https://wa.me/8801713490067';
const GOLD      = '#b9975b';

ini_set('display_errors', '0'); // never leak PHP warnings into the JSON reply
header('Content-Type: application/json');

function reply(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function esc(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function clip(mixed $s, int $n): string { return mb_substr(trim((string)($s ?? '')), 0, $n); }
/** Strips line breaks so user input can never inject extra mail headers. */
function oneLine(string $s): string { return trim(preg_replace('/[\r\n]+/', ' ', $s)); }
function firstName(string $name): string { return preg_split('/\s+/', trim($name))[0]; }

function layout(string $preheader, string $body): string {
    $g = GOLD; $site = SITE; $phone = PHONE; $wa = WHATSAPP;
    $pre = esc($preheader);
    return <<<HTML
<!doctype html><html><body style="margin:0;padding:0;background:#0a0a0b;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">{$pre}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0b;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141416;border:1px solid #2a2a2e;">
<tr><td style="padding:34px 40px 26px;border-bottom:2px solid {$g};">
  <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:4px;text-transform:uppercase;color:#f5f1e9;">Clothing Trims</div>
  <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:{$g};margin-top:4px;">International</div>
</td></tr>
<tr><td style="padding:38px 40px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#cfcac0;">{$body}</td></tr>
<tr><td style="padding:24px 40px;background:#0f0f11;border-top:1px solid #2a2a2e;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#8d8880;">
  Clothing Trims International · Uttara, Dhaka-1230, Bangladesh<br>
  <a href="tel:+8801713490067" style="color:{$g};text-decoration:none;">{$phone}</a> ·
  <a href="{$wa}" style="color:{$g};text-decoration:none;">WhatsApp</a> ·
  <a href="{$site}" style="color:{$g};text-decoration:none;">clothingtrimsintl.com</a>
</td></tr>
</table></td></tr></table></body></html>
HTML;
}

function row(string $label, string $value): string {
    $g = GOLD;
    return "<tr><td style=\"padding:12px 0;border-bottom:1px solid #2a2a2e;width:120px;vertical-align:top;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{$g};\">{$label}</td>"
         . "<td style=\"padding:12px 0;border-bottom:1px solid #2a2a2e;color:#f5f1e9;\">{$value}</td></tr>";
}

function ownerEmail(array $d): string {
    $g = GOLD;
    $name = esc($d['name']); $email = esc($d['email']); $first = esc(firstName($d['name']));
    $rows = row('Name', $name)
          . ($d['company'] !== '' ? row('Company', esc($d['company'])) : '')
          . row('Email', "<a href=\"mailto:{$email}\" style=\"color:{$g};text-decoration:none;\">{$email}</a>");
    $msg = esc($d['message']);
    $subject = rawurlencode('Re: your trims enquiry');
    $body = <<<HTML
<div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:{$g};margin-bottom:10px;">New enquiry</div>
<div style="font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#f5f1e9;margin-bottom:26px;">{$name} wants to talk trims.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;">{$rows}</table>
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{$g};margin-bottom:10px;">Message</div>
<div style="padding:20px 22px;background:#0f0f11;border-left:3px solid {$g};color:#f5f1e9;white-space:pre-wrap;">{$msg}</div>
<div style="margin-top:32px;"><a href="mailto:{$email}?subject={$subject}" style="display:inline-block;background:{$g};color:#0a0a0b;padding:14px 30px;font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">Reply to {$first}</a></div>
HTML;
    return layout('New enquiry from ' . $d['name'], $body);
}

function visitorEmail(array $d): string {
    $g = GOLD; $site = SITE;
    $first = esc(firstName($d['name'])); $msg = esc($d['message']);
    $body = <<<HTML
<div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:{$g};margin-bottom:10px;">Enquiry received</div>
<div style="font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#f5f1e9;margin-bottom:22px;">Thank you, {$first}.</div>
<p style="margin:0 0 18px;">We have received your enquiry and our team will get back to you shortly. If it is urgent, call or message our Managing Director directly.</p>
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{$g};margin:26px 0 10px;">Your message</div>
<div style="padding:18px 22px;background:#0f0f11;border-left:3px solid {$g};color:#bdb8ae;white-space:pre-wrap;">{$msg}</div>
<p style="margin:30px 0 24px;">In the meantime, browse the full range or download our catalogue.</p>
<a href="{$site}/collection" style="display:inline-block;background:{$g};color:#0a0a0b;padding:14px 28px;font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;text-decoration:none;margin-right:8px;">View collection</a>
<a href="{$site}/Clothing-Trims-Catalogue.pdf" style="display:inline-block;border:1px solid {$g};color:{$g};padding:13px 28px;font-size:12px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">Catalogue PDF</a>
<p style="margin:34px 0 0;color:#8d8880;font-size:13px;">Accessories that complete your creation.</p>
HTML;
    return layout('We have received your enquiry', $body);
}

/** Sends one HTML email with a plain-text alternative. */
function sendMail(string $to, string $replyTo, string $subject, string $html, string $text): bool {
    $boundary = 'b' . bin2hex(random_bytes(8));
    $headers = [
        'From: =?UTF-8?B?' . base64_encode(FROM_NAME) . '?= <' . MAIL_FROM . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
    ];
    $body = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($text))
          . "--{$boundary}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($html))
          . "--{$boundary}--";
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['error' => 'Method not allowed']);

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) reply(400, ['error' => 'Invalid request']);
if (!empty($in['website'])) reply(200, ['ok' => true]); // honeypot: bots fill this hidden field

$d = [
    'name'    => oneLine(clip($in['name'] ?? '', 100)),
    'company' => oneLine(clip($in['company'] ?? '', 120)),
    'email'   => oneLine(clip($in['email'] ?? '', 160)),
    'message' => clip($in['message'] ?? '', 4000),
];
if ($d['name'] === '' || $d['message'] === '' || !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) {
    reply(400, ['error' => 'Please fill in your name, a valid email and a message.']);
}

$subject = 'New trims enquiry from ' . $d['name'] . ($d['company'] !== '' ? ' (' . $d['company'] . ')' : '');
$text = "New enquiry\n\nName: {$d['name']}\nCompany: {$d['company']}\nEmail: {$d['email']}\n\n{$d['message']}";
if (!sendMail(MAIL_TO, $d['email'], $subject, ownerEmail($d), $text)) {
    reply(502, ['error' => 'Could not send your enquiry.']);
}

// The visitor's confirmation is best-effort: the enquiry itself has already reached us.
$confirmText = 'Thank you, ' . firstName($d['name']) . ".\n\nWe have received your enquiry and will reply shortly.\n\nYour message:\n{$d['message']}\n\n"
             . FROM_NAME . ' · ' . PHONE . ' · ' . SITE;
sendMail($d['email'], MAIL_TO, 'We have received your enquiry — ' . FROM_NAME, visitorEmail($d), $confirmText);

reply(200, ['ok' => true]);

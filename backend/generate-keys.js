const webpush = require('web-push');

console.log('🔑 Generating VAPID keys for Kiatech Software Push Notifications...\n');

const vapidKeys = webpush.generateVAPIDKeys();

console.log('✅ VAPID Keys Generated Successfully!\n');
console.log('📋 Copy these keys to your configuration:\n');
console.log('Public Key (Frontend):');
console.log(vapidKeys.publicKey);
console.log('\nPrivate Key (Backend):');
console.log(vapidKeys.privateKey);
console.log('\n🔧 Next Steps:');
console.log('1. Update server.js with the private key');
console.log('2. Update pushNotificationService.js with the public key');
console.log('3. Restart your backend server');
console.log('\n⚠️  Keep your private key secure and never share it publicly!');

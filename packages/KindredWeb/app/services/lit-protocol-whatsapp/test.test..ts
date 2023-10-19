import { claimKeysForGroup, pingWhatsAppForAuth, authenticateAndGetKey } from './lit-whatsapp';
import { OTPsWhatsappLoginOrCreateResponse } from 'stytch';

describe('lit-whatsapp-module', () => {
  // Replace with actual phone numbers
  const phoneNumbers = ['+16305966776'];

  it('should claim keys for group', async () => {
    const addresses = await claimKeysForGroup(phoneNumbers);
    expect(addresses).toBeDefined();
    console.log('Addresses:', addresses);
  });

  it('should ping WhatsApp for auth', async () => {
    const stytchResponse = await pingWhatsAppForAuth(phoneNumbers[0]);
    expect(stytchResponse).toBeDefined();
    console.log('Stytch Response:', stytchResponse);
  });

  it('should authenticate and get key', async () => {
    // Test pingWhatsAppForAuth with the first phone number
    const stytchResponse = await pingWhatsAppForAuth(phoneNumbers[0]);

    // Test authenticateAndGetKey with a dummy OTP code and the stytch response
    // Replace 'dummyOTPCode' with an actual OTP code
    const key = await authenticateAndGetKey('dummyOTPCode', stytchResponse as OTPsWhatsappLoginOrCreateResponse);
    expect(key).toBeDefined();
    console.log('Key:', key);
  });

})


testModule();
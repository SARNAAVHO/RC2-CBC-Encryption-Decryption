window.onload = function() {
    generateKey('encrypt-key');
    generateIV('encrypt-iv');
};

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

function generateKey(elementId) {
    const keySize = document.getElementById('key-size') ? 
                    document.getElementById('key-size').value : 16;
    const keyBytes = forge.random.getBytesSync(parseInt(keySize));
    const keyHex = forge.util.bytesToHex(keyBytes);
    document.getElementById(elementId).value = keyHex;
}

function generateIV(elementId) {
    const ivBytes = forge.random.getBytesSync(8);
    const ivHex = forge.util.bytesToHex(ivBytes);
    document.getElementById(elementId).value = ivHex;
}

function simulateEncryption() {
    const plaintext = document.getElementById('plaintext').value.trim();
    const keyHex = document.getElementById('encrypt-key').value.trim();
    const ivHex = document.getElementById('encrypt-iv').value.trim();

    if (!keyHex || !ivHex) {
        alert("Please generate a key and IV first");
        return;
    }
    if (plaintext === "") {
        alert("Please enter a message to encrypt.");
        return;
    }
    
    const keyBytes = forge.util.hexToBytes(keyHex);
    const ivBytes = forge.util.hexToBytes(ivHex);
    const cipher = forge.rc2.createEncryptionCipher(keyBytes);
    cipher.start(ivBytes);
    cipher.update(forge.util.createBuffer(plaintext, 'utf8'));
    cipher.finish();
    
    const encryptedHex = forge.util.bytesToHex(cipher.output.getBytes());
    
    document.getElementById('key-display').innerHTML = `<strong>Key:</strong> ${keyHex}`;
    document.getElementById('iv-display').innerHTML = `<strong>IV:</strong> ${ivHex}`;
    document.getElementById('ciphertext-display').innerHTML = `<strong>Ciphertext:</strong> ${encryptedHex}`;
    document.getElementById('encryption-result').style.display = 'block';
    
    document.getElementById('decrypt-key').value = keyHex;
    document.getElementById('decrypt-iv').value = ivHex;
    document.getElementById('ciphertext').value = encryptedHex;
}

function simulateDecryption() {
    const ciphertextHex = document.getElementById('ciphertext').value.trim();
    const keyHex = document.getElementById('decrypt-key').value.trim();
    const ivHex = document.getElementById('decrypt-iv').value.trim();

    if (!keyHex || !ivHex || !ciphertextHex) {
        alert("Please enter the key, IV, and ciphertext.");
        return;
    }
    
    try {
        const keyBytes = forge.util.hexToBytes(keyHex);
        const ivBytes = forge.util.hexToBytes(ivHex);
        const cipher = forge.rc2.createDecryptionCipher(keyBytes);
        cipher.start(ivBytes);
        cipher.update(forge.util.createBuffer(forge.util.hexToBytes(ciphertextHex)));
        cipher.finish();
        
        const decryptedText = cipher.output.toString('utf8');
        
        document.getElementById('decrypted-display').innerHTML = `<strong>Decrypted Text:</strong> ${decryptedText}`;
        document.getElementById('decryption-result').style.display = 'block';
    } catch (error) {
        alert("Decryption failed! Ensure correct key, IV, and ciphertext.");
        console.error(error);
    }
}

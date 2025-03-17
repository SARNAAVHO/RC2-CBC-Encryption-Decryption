 
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
            const key = Array.from({length: parseInt(keySize)}, () => 
                Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
            
            document.getElementById(elementId).value = key;
        }
        
        
        function generateIV(elementId) {
            const iv = Array.from({length: 8}, () => 
                Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
            
            document.getElementById(elementId).value = iv;
        }
        
        
        let storedPlaintext = ""; 

function simulateEncryption() {
    const plaintext = document.getElementById('plaintext').value.trim();
    const key = document.getElementById('encrypt-key').value.trim();
    const iv = document.getElementById('encrypt-iv').value.trim();

    if (!key || !iv) {
        alert("Please generate a key and IV first");
        return;
    }

    
    if (plaintext === "") {
        alert("Please enter a message to encrypt.");
        return;
    }

    
    storedPlaintext = plaintext;

    
    const ciphertext = Array.from(plaintext).map(() => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');

    
    document.getElementById('key-display').innerHTML = `<strong>Key:</strong> ${key}`;
    document.getElementById('iv-display').innerHTML = `<strong>IV:</strong> ${iv}`;
    document.getElementById('padded-display').innerHTML = `<strong>Original Length:</strong> ${plaintext.length} bytes`;
    document.getElementById('ciphertext-display').innerHTML = `<strong>Ciphertext:</strong> ${ciphertext}`;

    document.getElementById('encryption-result').style.display = 'block';

    
    document.getElementById('decrypt-key').value = key;
    document.getElementById('decrypt-iv').value = iv;
    document.getElementById('ciphertext').value = ciphertext;
}

        
        
        function simulateDecryption() {
    const ciphertext = document.getElementById('ciphertext').value.trim();
    const key = document.getElementById('decrypt-key').value.trim();
    const iv = document.getElementById('decrypt-iv').value.trim();

    if (!key || !iv || !ciphertext) {
        alert("Please enter the key, IV, and ciphertext.");
        return;
    }

    
    if (!/^[0-9a-fA-F]+$/.test(ciphertext) || ciphertext.length % 2 !== 0) {
        alert("Invalid ciphertext format! It should be a valid hex string.");
        return;
    }

    try {
        
        let decryptedText = storedPlaintext || "(Decryption Failed)";

        
        document.getElementById('decrypted-display').innerHTML = `<strong>Decrypted Text:</strong> ${decryptedText}`;
        document.getElementById('decryption-result').style.display = 'block';

    } catch (error) {
        alert("Decryption failed! Ensure correct key, IV, and ciphertext.");
        console.error(error);
    }
}

import bcrypt from 'bcryptjs' // Ensure bcryptjs is imported

// Generate a unique 15-digit barcode
const generateBarcode = async () => {
  const rawValue = `${Date.now()}${Math.floor(Math.random() * 1000)}`
  const salt = await bcrypt.genSalt(10)
  const hashedBarcode = await bcrypt.hash(rawValue, salt)

  let numericBarcode = hashedBarcode.replace(/\D/g, '').substring(0, 15) // Extract 15 digits

  // Fallback to ensure barcode has exactly 15 digits
  while (numericBarcode.length < 15) {
    numericBarcode += Math.floor(Math.random() * 10) // Add random digits if needed
  }

  return numericBarcode
}

export {
  generateBarcode
}
import bcrypt from "bcryptjs";

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

// Get password from command line argument or use default
const password = process.argv[2] || "admin123";

hashPassword(password)
  .then((hash) => {
    console.log("\n✅ Password hashed successfully!\n");
    console.log("Original password:", password);
    console.log("Hashed password:", hash);
    console.log("\n💡 Copy the hash above and use it in your database.\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error hashing password:", error);
    process.exit(1);
  });

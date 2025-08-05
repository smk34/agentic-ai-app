export const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials (for demo only)
  const VALID_USER = {
    username: "demo",
    password: "password123",
  };

  if (username === VALID_USER.username && password === VALID_USER.password) {
    // Return a mock token (could be JWT or dummy string)
    const mockToken = "mock-token-12345";

    res.status(200).json({
      message: "Login successful",
      token: mockToken,
      user: {
        username: VALID_USER.username,
      },
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};

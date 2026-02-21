import { requireAuth } from "@clerk/express";
export const requireAdmin = async (req, res, next) => {
  const { sessionClaims } = req.auth();

  if (sessionClaims?.publicMetadata?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

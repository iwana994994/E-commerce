export const requireAdmin = async (req, res, next) => {
  const { sessionClaims } = req.auth();

  if (sessionClaims?.publicMetadata?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

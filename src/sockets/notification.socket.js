let io;

export const initNotificationSocket = (socketIO) => {
  io = socketIO;
};

export const emitNewUserNotification = (user) => {
  if (!io) {
    console.warn("Socket.IO has not been initialized");
    return;
  }

  io.to("admins").emit("notification:new-user", {
    type: "NEW_USER",
    title: "New user registered",
    message: `${user.name} has registered`,
    data: {
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    createdAt: new Date().toISOString(),
  });
};
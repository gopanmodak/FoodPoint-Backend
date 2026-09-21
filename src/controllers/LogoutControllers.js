const logout = (req, res) => {
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: false
    })
    res.status(200).send({
      message: "Logout Successfully",
    })
  } catch (error) {
    res.status(500).send({
      message: "Logout Error..Something wend wrong",
      error: error.message,
    });
  }
};

module.exports = logout;

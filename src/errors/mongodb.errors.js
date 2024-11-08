const notFoundError = (res) => {
    return res
        .status(404)
        .send("Este dado não foi encontrado no banco de dados!");
};

const objetIdCastError = (res) => {
    return res
        .status(400)
        .send("Ocorreu um error a recuperar este dado no banco de dados!");
};

module.exports = {
    notFoundError,
    objetIdCastError,
};

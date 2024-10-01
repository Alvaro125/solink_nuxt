import Link from "~/server/models/link";

function gerarStringAleatoria(tamanho: number): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';

  for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres[indiceAleatorio];
  }

  return resultado;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
      const link = new Link({
        content: gerarStringAleatoria(6),
        redirect: body.redirect
      });
      const savedLink = await link.save();
      return savedLink;
    } catch (error:any) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }
  });
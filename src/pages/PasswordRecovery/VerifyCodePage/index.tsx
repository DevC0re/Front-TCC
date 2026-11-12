import { useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./ResetPasswordPage.module.scss";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import axios from "axios";


export function VerifyCodePage() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("verificationEmail");

  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

async function handleVerify() {
  setError("");

  if (!email) {
    setError("E-mail de verificação não encontrado.");
    return;
  }

  if (codigo.length !== 6) {
    setError("Digite o código de 6 dígitos.");
    return;
  }

  try {
    setLoading(true);

    await axios.post(
      "https://medupp-dbbwg6bqcqbya7db.southafricanorth-01.azurewebsites.net",
      {
        email,
        codigo,
      }
    );

    sessionStorage.removeItem("verificationEmail");
    navigate("/");
  } catch (error) {
    console.error(error);
    setError("Código inválido ou expirado.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className={s.body}>
      <div className={s.content}>
        <div className={s.box}>
          <div className={s.texts}>
            <h1>Verifique a conta</h1>

            <div className={s.instructionText}>
              <p>
                O código foi enviado para <span>{email}</span>.
                Digite o código para verificar sua conta.
              </p>
            </div>
          </div>

          <div className={s.input}>
            <label htmlFor="verification-code">Insira o código</label>

            <Input
              id="verification-code"
              className={s.form}
              placeholder="Código de 6 dígitos"
              value={codigo}
              maxLength={6}
              inputMode="numeric"
              onChange={(e) =>
                setCodigo(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
            />

            {error && <p className={s.error}>{error}</p>}

            {/* Não ativar ainda sem endpoint no backend */}
            <p className={s.receiveCode}>
              Não recebeu o código?
              <span className={s.reCode}> Reenviar código</span>
            </p>
          </div>
        </div>

        <div className={s.button}>
          <Button
            children={
              loading ? "Verificando..." : "Verificar conta"
            }
            onClick={handleVerify}
          />
        </div>
      </div>
    </div>
  );
}
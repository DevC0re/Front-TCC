import s from "./UserProfilePage.module.scss";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button } from "../../components/Button";

import {
  getCurrentUser,
  updateCurrentUser,
  getConvenios,
  updateCurrentUserConvenio,
  type Convenio,
  type UserProfile,
} from "../../service/userService";

export function UserProfilePage() {
  const [userData, setUserData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    convenio: null,
  });

  const [convenios, setConvenios] = useState<Convenio[]>([]);

  const [selectedConvenio, setSelectedConvenio] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  const [isEditingConvenio, setIsEditingConvenio] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // CARREGA O USUÁRIO E OS CONVÊNIOS
  useEffect(() => {
    async function loadProfile() {
      try {
        const [userResponse, convenioResponse] =
          await Promise.all([
            getCurrentUser(),
            getConvenios(),
          ]);

        setUserData(userResponse.data);

        setConvenios(convenioResponse.data);

        if (userResponse.data.convenio) {
          setSelectedConvenio(
            userResponse.data.convenio.id
          );
        }
      } catch (error) {
        console.error(
          "Erro ao carregar perfil:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { id, value } = event.target;

    setUserData((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  async function handleUpdateProfile(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const response =
        await updateCurrentUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          birthDate: userData.birthDate,
        });

      setUserData(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário:",
        error
      );
    }
  }

  async function handleUpdateConvenio() {
    if (!selectedConvenio) return;

    try {
      const response =
        await updateCurrentUserConvenio(
          selectedConvenio
        );

      setUserData(response.data);

      setIsEditingConvenio(false);
    } catch (error) {
      console.error(
        "Erro ao atualizar convênio:",
        error
      );
    }
  }

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <>
      <div className={s.body}>
        <Navbar />

        <div className={s.main}>
          <h1>Perfil de usuário</h1>

          <p>
            Gerencie suas informações pessoais,
            endereços e plano de saúde
          </p>

          {/* PERFIL */}

          <div className={s.userCard}>
            <img
              src={userData.photo ?? ""}
              alt="Foto do usuário"
            />

            <div className={s.userInfos}>
              <h1>
                {userData.name || "Usuário"}
              </h1>

              <p>{userData.email}</p>
            </div>

            {!isEditing && (
              <Button
                type="button"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Editar perfil
              </Button>
            )}
          </div>

          {/* EDIÇÃO DO PERFIL */}

          {isEditing && (
            <form
              onSubmit={handleUpdateProfile}
              className={s.editInfo}
            >
              <h1>
                Editar informações pessoais
              </h1>

              <p>
                Altere seus dados e salve
                quando terminar.
              </p>

              <div className={s.inputWrapper}>
                <Input
                  type="text"
                  id="name"
                  placeholder="Nome completo"
                  value={userData.name}
                  onChange={handleChange}
                />

                <Input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={userData.email}
                  onChange={handleChange}
                />

                <Input
                  type="tel"
                  id="phone"
                  placeholder="Telefone"
                  value={userData.phone}
                  onChange={handleChange}
                />

                <Input
                  type="date"
                  id="birthDate"
                  value={userData.birthDate}
                  onChange={handleChange}
                />

                <Button type="submit">
                  Salvar alterações
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}

          {/* ENDEREÇO */}

          <div className={s.adressInfo}>
            <h1>Endereço</h1>

            <div className={s.inputWrapper}>
              <Input
                type="text"
                id="road"
                placeholder="Rua"
              />

              <Input
                type="text"
                id="neighborhood"
                placeholder="Bairro"
              />

              <Input
                type="text"
                id="cep"
                placeholder="CEP"
              />

              <Input
                type="text"
                id="number"
                placeholder="Número"
              />

              <Input
                type="text"
                id="city"
                placeholder="Cidade"
              />

              <Input
                type="text"
                id="state"
                placeholder="Estado"
              />
            </div>

            <Button type="button">
              Editar endereço
            </Button>
          </div>

          {/* CONVÊNIO */}

          <div className={s.agreementInfo}>
            <div className={s.texts}>
              <h1>Convênio</h1>

              <p>
                Plano de saúde vinculado para
                atendimentos rápidos nos hospitais
                credenciados.
              </p>
            </div>

            {!isEditingConvenio ? (
              <>
                {userData.convenio ? (
                  <div className={s.texts}>
                    <p>
                      NOME DO CONVÊNIO
                    </p>

                    <h1>
                      {userData.convenio.name}
                    </h1>

                    <p>
                      Hospitais credenciados:
                    </p>

                    {userData.convenio
                      .hospitaisAceitos
                      .map((hospital) => (
                        <p key={hospital}>
                          {hospital}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p>
                    Nenhum convênio vinculado.
                  </p>
                )}

                <Button
                  type="button"
                  onClick={() =>
                    setIsEditingConvenio(true)
                  }
                >
                  Editar convênio
                </Button>
              </>
            ) : (
              <div
                className={
                  s.editAgreement
                }
              >
                <label htmlFor="convenio">
                  Selecione seu convênio
                </label>

                <select
                  id="convenio"
                  value={selectedConvenio}
                  onChange={(event) =>
                    setSelectedConvenio(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Selecione
                  </option>

                  {convenios.map(
                    (convenio) => (
                      <option
                        key={convenio.id}
                        value={convenio.id}
                      >
                        {convenio.name}
                      </option>
                    )
                  )}
                </select>

                <Button
                  type="button"
                  onClick={
                    handleUpdateConvenio
                  }
                >
                  Salvar convênio
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    setIsEditingConvenio(
                      false
                    )
                  }
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
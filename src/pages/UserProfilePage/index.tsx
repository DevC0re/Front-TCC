import s from "./UserProfilePage.module.scss";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../../components/Button";

import {
  getCurrentUser,
  updateCurrentUser,
  getConvenios,
  updateCurrentUserConvenio,
  type Convenio,
  type UserProfile,
} from "../../service/userService";
import { AddressCard } from "../../components/AdressCard";

import { AddressMap } from "../../components/AdressMap";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
  type AddressRequest,
  type AddressResponse,
} from "../../service/adressService";

import {
  searchAddressByCep,
  searchCoordinatesByCep,
  type Coordinates,
} from "../../service/geocodingService";

const emptyAddress: AddressRequest = {
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  complemento: "",
  apelido: "",
  latitude: null,
  longitude: null,
};

export function UserProfilePage() {
  const [userData, setUserData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    convenio: null,
  });

  const [mapFocus, setMapFocus] = useState<Coordinates | null>(null);

  const [locationMessage, setLocationMessage] = useState("");

  const [searchingCep, setSearchingCep] = useState(false);

  const [addresses, setAddresses] = useState<AddressResponse[]>([]);

  const [addressData, setAddressData] = useState<AddressRequest>(emptyAddress);

  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [savingAddress, setSavingAddress] = useState(false);

  const [addressError, setAddressError] = useState("");

  const [convenios, setConvenios] = useState<Convenio[]>([]);

  const [selectedConvenio, setSelectedConvenio] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [isEditingConvenio, setIsEditingConvenio] = useState(false);

  const [loading, setLoading] = useState(true);

  // CARREGA O USUÁRIO E OS CONVÊNIOS
  useEffect(() => {
    async function loadProfile() {
      try {
        const [userResponse, convenioResponse] = await Promise.all([
          getCurrentUser(),
          getConvenios(),
        ]);

        setUserData(userResponse.data);

        setConvenios(convenioResponse.data);

        if (userResponse.data.convenio) {
          setSelectedConvenio(userResponse.data.convenio.id);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  useEffect(() => {
    async function loadAddresses() {
      try {
        const response = await getAddresses();

        setAddresses(response.data);
      } catch (error) {
        setAddressError("Não foi possível carregar os endereços.");

        console.error(error);
      } finally {
        setLoadingAddresses(false);
      }
    }

    loadAddresses();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setUserData((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  async function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await updateCurrentUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        birthDate: userData.birthDate,
      });

      setUserData(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  async function handleUpdateConvenio() {
    if (!selectedConvenio) return;

    try {
      const response = await updateCurrentUserConvenio(selectedConvenio);

      setUserData(response.data);

      setIsEditingConvenio(false);
    } catch (error) {
      console.error("Erro ao atualizar convênio:", error);
    }
  }

  function handleNewAddress() {
    setAddressData({ ...emptyAddress });
    setEditingAddressId(null);
    setAddressError("");
    setIsEditingAddress(true);
  }

  function handleEditAddress(address: AddressResponse) {
    setAddressData({
      cep: address.cep,
      logradouro: address.logradouro,
      numero: address.numero,
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado,
      complemento: address.complemento,
      apelido: address.apelido,
      latitude: address.latitude,
      longitude: address.longitude,
    });

    setEditingAddressId(address.id);
    setAddressError("");
    setIsEditingAddress(true);
  }

  function handleAddressChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    const changesLocation = [
      "cep",
      "logradouro",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ].includes(id);

    setAddressData((previous) => ({
      ...previous,
      [id]: value,
      ...(changesLocation
        ? {
            latitude: null,
            longitude: null,
          }
        : {}),
    }));
  }

  function handleCancelAddress() {
    setAddressData({ ...emptyAddress });
    setEditingAddressId(null);
    setIsEditingAddress(false);
    setAddressError("");
  }

  async function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingAddress) return;

    setSavingAddress(true);
    setAddressError("");

    const data: AddressRequest = {
      ...addressData,
      estado: addressData.estado.trim().toUpperCase(),
      cep: addressData.cep.replace(/\D/g, ""),
    };

    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, data);
      } else {
        await createAddress(data);
      }
    } catch (error) {
      setAddressError("Não foi possível salvar o endereço.");

      console.error(error);
      setSavingAddress(false);
      return;
    }

    handleCancelAddress();

    try {
      const response = await getAddresses();

      setAddresses(response.data);
    } catch (error) {
      setAddressError(
        "Endereço salvo, mas não foi possível atualizar a lista.",
      );

      console.error(error);
    } finally {
      setSavingAddress(false);
    }
  }

  async function handleDeleteAddress(id: string) {
    if (savingAddress) return;

    const confirmed = window.confirm("Deseja realmente excluir este endereço?");

    if (!confirmed) return;

    setSavingAddress(true);
    setAddressError("");

    try {
      await deleteAddress(id);

      const response = await getAddresses();

      setAddresses(response.data);

      if (editingAddressId === id) {
        handleCancelAddress();
      }
    } catch (error) {
      setAddressError(
        "Não foi possível concluir a operação. Recarregue a lista antes de tentar novamente.",
      );

      console.error(error);
    } finally {
      setSavingAddress(false);
    }
  }

  async function handleSetPrimaryAddress(id: string) {
    if (savingAddress) return;

    setSavingAddress(true);
    setAddressError("");

    try {
      await setPrimaryAddress(id);

      const response = await getAddresses();

      setAddresses(response.data);
    } catch (error) {
      setAddressError("Não foi possível atualizar o endereço principal.");

      console.error(error);
    } finally {
      setSavingAddress(false);
    }
  }

async function handleSearchCep() {
  if (searchingCep || savingAddress) return;

  setSearchingCep(true);
  setAddressError("");
  setMapFocus(null);

  try {
    const result = await searchAddressByCep(
      addressData.cep
    );

    setAddressData(previous => ({
      ...previous,
      ...result,
      latitude: null,
      longitude: null,
    }));

    const coordinates = await searchCoordinatesByCep(
      result.cep
    ).catch(() => null);

    setMapFocus(coordinates);

  } catch {
    setAddressError("Não foi possível localizar o CEP.");
  } finally {
    setSearchingCep(false);
  }
}

  function handleLocationSelect(latitude: number, longitude: number) {
    if (savingAddress || searchingCep) return;

    setAddressData((previous) => ({
      ...previous,
      latitude: Number(latitude.toFixed(7)),
      longitude: Number(longitude.toFixed(7)),
    }));
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

          <p>Gerencie suas informações pessoais, endereços e plano de saúde</p>

          {/* PERFIL */}

          <div className={s.userCard}>
            <img src={userData.photo ?? ""} alt="Foto do usuário" />

            <div className={s.userInfos}>
              <h1>{userData.name || "Usuário"}</h1>

              <p>{userData.email}</p>
            </div>

            {!isEditing && (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Editar perfil
              </Button>
            )}
          </div>

          {/* EDIÇÃO DO PERFIL */}

          {isEditing && (
            <form onSubmit={handleUpdateProfile} className={s.editInfo}>
              <h1>Editar informações pessoais</h1>

              <p>Altere seus dados e salve quando terminar.</p>

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

                <Button type="submit">Salvar alterações</Button>

                <Button type="button" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}

          {/* ENDEREÇO */}

          <div className={s.adressInfo}>
            <h1>Endereço</h1>

            <section className={s.adressInfo}>
              <div className={s.addressSectionHeader}>
                <div>
                  <h1>Meus endereços</h1>

                  <p>Gerencie seus endereços cadastrados.</p>
                </div>

                {!isEditingAddress && (
                  <Button
                    type="button"
                    onClick={handleNewAddress}
                    disabled={loadingAddresses || savingAddress}
                  >
                    Adicionar endereço
                  </Button>
                )}
              </div>

              {addressError && (
                <p className={s.addressError} role="alert">
                  {addressError}
                </p>
              )}

              {loadingAddresses ? (
                <p>Carregando endereços...</p>
              ) : (
                <>
                  {addresses.length === 0 &&
                    !isEditingAddress &&
                    !addressError && (
                      <div className={s.emptyAddresses}>
                        <p>Nenhum endereço cadastrado.</p>
                      </div>
                    )}

                  <div className={s.addressList}>
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={(item) => {
                          if (!savingAddress) {
                            handleEditAddress(item);
                          }
                        }}
                        onDelete={handleDeleteAddress}
                        onSetPrimary={handleSetPrimaryAddress}
                      />
                    ))}
                  </div>
                </>
              )}

              {isEditingAddress && (
                <form className={s.addressForm} onSubmit={handleAddressSubmit}>
                  <h2>
                    {editingAddressId ? "Editar endereço" : "Novo endereço"}
                  </h2>

                  <fieldset
                    className={s.inputWrapper}
                    disabled={savingAddress || searchingCep}
                  >
                    <Input
                      type="text"
                      id="apelido"
                      placeholder="Apelido (Casa, Trabalho...)"
                      value={addressData.apelido ?? ""}
                      onChange={handleAddressChange}
                      maxLength={60}
                    />

                    <div className={s.cepSearch}>
                      <Input
                        type="text"
                        id="cep"
                        placeholder="CEP"
                        value={addressData.cep}
                        onChange={handleAddressChange}
                        maxLength={9}
                        pattern="[0-9]{5}-?[0-9]{3}"
                        disabled={searchingCep}
                        required
                      />

                      <Button
                        type="button"
                        onClick={handleSearchCep}
                        disabled={searchingCep || savingAddress}
                      >
                        {searchingCep ? "Buscando..." : "Buscar"}
                      </Button>
                    </div>

                    <Input
                      type="text"
                      id="logradouro"
                      placeholder="Rua ou avenida"
                      value={addressData.logradouro}
                      onChange={handleAddressChange}
                      maxLength={180}
                      required
                    />

                    <Input
                      type="text"
                      id="numero"
                      placeholder="Número"
                      value={addressData.numero}
                      onChange={handleAddressChange}
                      maxLength={20}
                      required
                    />

                    <Input
                      type="text"
                      id="bairro"
                      placeholder="Bairro"
                      value={addressData.bairro}
                      onChange={handleAddressChange}
                      maxLength={100}
                      required
                    />

                    <Input
                      type="text"
                      id="cidade"
                      placeholder="Cidade"
                      value={addressData.cidade}
                      onChange={handleAddressChange}
                      maxLength={100}
                      required
                    />

                    <Input
                      type="text"
                      id="estado"
                      placeholder="UF"
                      maxLength={2}
                      pattern="[A-Za-z]{2}"
                      value={addressData.estado}
                      onChange={handleAddressChange}
                      required
                    />

                    <Input
                      type="text"
                      id="complemento"
                      placeholder="Complemento"
                      value={addressData.complemento ?? ""}
                      onChange={handleAddressChange}
                      maxLength={150}
                    />
                  </fieldset>

                  <AddressMap
                    latitude={addressData.latitude ?? null}
                    longitude={addressData.longitude ?? null}
                    focus={mapFocus}
                    onLocationSelect={handleLocationSelect}
                    disabled={savingAddress || searchingCep}
                  />

                  {locationMessage && (
                    <p className={s.locationMessage} role="status">
                      {locationMessage}
                    </p>
                  )}

                  <div className={s.addressFormActions}>
                    <Button type="submit" disabled={savingAddress}>
                      {savingAddress ? "Salvando..." : "Salvar endereço"}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleCancelAddress}
                      disabled={savingAddress}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </section>
          </div>

          <Button type="button">Editar endereço</Button>
        </div>

        {/* CONVÊNIO */}

        <div className={s.agreementInfo}>
          <div className={s.texts}>
            <h1>Convênio</h1>

            <p>
              Plano de saúde vinculado para atendimentos rápidos nos hospitais
              credenciados.
            </p>
          </div>

          {!isEditingConvenio ? (
            <>
              {userData.convenio ? (
                <div className={s.texts}>
                  <p>NOME DO CONVÊNIO</p>

                  <h1>{userData.convenio.name}</h1>

                  <p>Hospitais credenciados:</p>

                  {userData.convenio.hospitaisAceitos.map((hospital) => (
                    <p key={hospital}>{hospital}</p>
                  ))}
                </div>
              ) : (
                <p>Nenhum convênio vinculado.</p>
              )}

              <Button type="button" onClick={() => setIsEditingConvenio(true)}>
                Editar convênio
              </Button>
            </>
          ) : (
            <div className={s.editAgreement}>
              <label htmlFor="convenio">Selecione seu convênio</label>

              <select
                id="convenio"
                value={selectedConvenio}
                onChange={(event) => setSelectedConvenio(event.target.value)}
              >
                <option value="">Selecione</option>

                {convenios.map((convenio) => (
                  <option key={convenio.id} value={convenio.id}>
                    {convenio.name}
                  </option>
                ))}
              </select>

              <Button type="button" onClick={handleUpdateConvenio}>
                Salvar convênio
              </Button>

              <Button type="button" onClick={() => setIsEditingConvenio(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

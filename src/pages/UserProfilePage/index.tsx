import s from "./UserProfilePage.module.scss";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../../components/Button";

import {
  getCurrentUser,
  updateCurrentUser,
  getConvenios,
  updateCurrentUserConvenio,
  type Convenio,
  type UserProfile,
  type UpdateUserProfile,
} from "../../service/userService";
import { AddressCard } from "../../components/AddressCard";

import { AddressMap } from "../../components/AddressMap";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
  type AddressRequest,
  type AddressResponse,
} from "../../service/addressService";

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

const cepPattern = /^\d{5}-?\d{3}$/;
const validStates = new Set(
  "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" "),
);

export function UserProfilePage() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [profileDraft, setProfileDraft] = useState<UpdateUserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState("");
  const [profileError, setProfileError] = useState("");

  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loadingConvenios, setLoadingConvenios] = useState(true);
  const [convenioLoadError, setConvenioLoadError] = useState("");
  const [convenioError, setConvenioError] = useState("");
  const [selectedConvenio, setSelectedConvenio] = useState("");
  const [isEditingConvenio, setIsEditingConvenio] = useState(false);

  // As duas operações retornam o perfil completo.
  const userSaveLock = useRef(false);
  const [savingUser, setSavingUser] = useState<"profile" | "convenio" | null>(null);

  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [addressData, setAddressData] = useState<AddressRequest>(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [addressListError, setAddressListError] = useState("");
  const [addressError, setAddressError] = useState("");

  const [mapFocus, setMapFocus] = useState<Coordinates | null>(null);
  const cepRequest = useRef<AbortController | null>(null);
  const addressSaveLock = useRef(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const addressBusy = searchingCep || savingAddress;

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then(({ data }) => {
        if (active) setUserData(data);
      })
      .catch(() => {
        if (active) setProfileLoadError("Não foi possível carregar seu perfil.");
      })
      .finally(() => {
        if (active) setLoadingProfile(false);
      });

    getConvenios()
      .then(({ data }) => {
        if (active) setConvenios(data);
      })
      .catch(() => {
        if (active) setConvenioLoadError("Não foi possível carregar a lista de convênios.");
      })
      .finally(() => {
        if (active) setLoadingConvenios(false);
      });

    getAddresses()
      .then(({ data }) => {
        if (active) setAddresses(data);
      })
      .catch(() => {
        if (active) setAddressListError("Não foi possível carregar os endereços.");
      })
      .finally(() => {
        if (active) setLoadingAddresses(false);
      });

    return () => {
      active = false;
      cepRequest.current?.abort();
    };
  }, []);

  function startProfileEdit() {
    if (!userData || userSaveLock.current) return;

    setProfileError("");
    setProfileDraft({
      name: userData.name ?? "",
      email: userData.email ?? "",
      phone: userData.phone ?? "",
      birthDate: userData.birthDate?.slice(0, 10) ?? "",
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.currentTarget;
    setProfileDraft((previous) => previous && { ...previous, [id]: value });
  }

  async function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profileDraft || userSaveLock.current) return;

    const data = {
      name: profileDraft.name.trim(),
      email: profileDraft.email.trim(),
      phone: profileDraft.phone.trim(),
      birthDate: profileDraft.birthDate,
    };
    const phoneDigits = data.phone.replace(/\D/g, "");
    const today = new Date();
    const birthDate = new Date(data.birthDate + "T00:00:00");
    const [year, month, day] = data.birthDate.split("-").map(Number);

    if (!data.name || !/\p{L}/u.test(data.name)) {
      setProfileError("Informe um nome válido.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setProfileError("Informe um e-mail válido.");
      return;
    }
    if (
      !/^\+?[\d() .-]+$/.test(data.phone) || !/^(?:55)?\d{10,11}$/.test(phoneDigits) ||
      (data.phone.startsWith("+") && !/^55\d{10,11}$/.test(phoneDigits))
    ) {
      setProfileError("Informe um telefone com DDD, com 10 ou 11 dígitos, e código +55 opcional.");
      return;
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.birthDate) ||
      year < 1 ||
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() + 1 !== month ||
      birthDate.getDate() !== day ||
      birthDate > today
    ) {
      setProfileError("Informe uma data de nascimento válida, sem usar uma data futura.");
      return;
    }

    userSaveLock.current = true;
    setSavingUser("profile");
    setProfileError("");
    try {
      const { data: updated } = await updateCurrentUser(data);
      setUserData(updated);
      setProfileDraft(null);
    } catch {
      setProfileError("Não foi possível salvar seu perfil. Tente novamente.");
    } finally {
      userSaveLock.current = false;
      setSavingUser(null);
    }
  }

  function resetConvenioSelection() {
    setSelectedConvenio(userData?.convenio?.id ?? "");
    setConvenioError("");
  }

  async function handleUpdateConvenio() {
    if (userSaveLock.current) return;
    if (!convenios.some(({ id }) => id === selectedConvenio && id)) {
      setConvenioError("Selecione um convênio da lista.");
      return;
    }

    userSaveLock.current = true;
    setSavingUser("convenio");
    setConvenioError("");
    try {
      const { data } = await updateCurrentUserConvenio(selectedConvenio);
      setUserData(data);
      setIsEditingConvenio(false);
    } catch {
      setConvenioError("Não foi possível atualizar o convênio. Tente novamente.");
    } finally {
      userSaveLock.current = false;
      setSavingUser(null);
    }
  }

  function resetAddressForm() {
    setAddressData(emptyAddress);
    setEditingAddressId(null);
    setIsEditingAddress(false);
    setMapFocus(null);
    setAddressError("");
  }

  function handleNewAddress() {
    if (addressSaveLock.current || cepRequest.current) return;
    resetAddressForm();
    setIsEditingAddress(true);
  }

  function handleEditAddress(address: AddressResponse) {
    if (addressSaveLock.current || cepRequest.current) return;

    const { latitude, longitude } = address;
    const focus = latitude != null && longitude != null &&
      Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180
      ? { latitude, longitude }
      : null;

    setAddressData({
      cep: address.cep,
      logradouro: address.logradouro,
      numero: address.numero,
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado,
      complemento: address.complemento,
      apelido: address.apelido,
      latitude: focus?.latitude ?? null,
      longitude: focus?.longitude ?? null,
    });
    setMapFocus(focus);
    setEditingAddressId(address.id);
    setAddressError("");
    setIsEditingAddress(true);
  }

  function handleAddressChange(event: ChangeEvent<HTMLInputElement>) {
    if (addressSaveLock.current || cepRequest.current) return;

    const { id, value } = event.currentTarget;
    const changesLocation = ["cep", "logradouro", "numero", "bairro", "cidade", "estado"].includes(id);

    setAddressData((previous) => ({
      ...previous,
      [id]: value,
      ...(changesLocation ? { latitude: null, longitude: null } : {}),
    }));
    if (changesLocation) setMapFocus(null);
  }

  async function saveAddressOperation(operation: () => Promise<unknown>, errorMessage: string) {
    if (addressSaveLock.current || cepRequest.current) return;

    addressSaveLock.current = true;
    setSavingAddress(true);
    setAddressError("");

    try {
      await operation();

      try {
        const { data } = await getAddresses();
        setAddresses(data);
        setAddressListError("");
      } catch {
        setAddressListError("Alteração concluída, mas não foi possível atualizar a lista de endereços. Recarregue a página.");
      }
    } catch {
      setAddressError(errorMessage);
    } finally {
      addressSaveLock.current = false;
      setSavingAddress(false);
    }
  }

  async function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addressSaveLock.current || cepRequest.current) return;

    const cep = addressData.cep.trim();
    const data: AddressRequest = {
      ...addressData,
      cep: cep.replace("-", ""),
      logradouro: addressData.logradouro.trim(),
      numero: addressData.numero.trim(),
      bairro: addressData.bairro.trim(),
      cidade: addressData.cidade.trim(),
      estado: addressData.estado.trim().toUpperCase(),
    };

    if (!cepPattern.test(cep)) {
      setAddressError("Informe um CEP com oito dígitos.");
      return;
    }
    if (!data.logradouro || !data.numero || !data.bairro || !data.cidade) {
      setAddressError("Preencha logradouro, número, bairro e cidade.");
      return;
    }
    if (
      data.logradouro.length > 180 || data.numero.length > 20 ||
      data.bairro.length > 100 || data.cidade.length > 100 ||
      (data.apelido?.length ?? 0) > 60 || (data.complemento?.length ?? 0) > 150
    ) {
      setAddressError("Reduza o tamanho dos campos de endereço antes de salvar.");
      return;
    }
    if (!validStates.has(data.estado)) {
      setAddressError("Informe uma sigla de estado válida.");
      return;
    }

    await saveAddressOperation(async () => {
      const { data: saved } = editingAddressId
        ? await updateAddress(editingAddressId, data)
        : await createAddress(data);

      if (saved?.id) {
        setAddresses((previous) => editingAddressId
          ? previous.map((address) => address.id === editingAddressId ? saved : address)
          : [...previous, saved]);
      }
      resetAddressForm();
    }, "Não foi possível salvar o endereço. Tente novamente.");
  }

  async function handleDeleteAddress(id: string) {
    if (addressSaveLock.current || cepRequest.current) return;
    if (!window.confirm("Deseja realmente excluir este endereço?")) return;

    await saveAddressOperation(async () => {
      await deleteAddress(id);
      setAddresses((previous) => previous.filter((address) => address.id !== id));
      if (editingAddressId === id) resetAddressForm();
    }, "Não foi possível excluir o endereço. Confira a lista antes de tentar novamente.");
  }

  async function handleSetPrimaryAddress(id: string) {
    await saveAddressOperation(async () => {
      await setPrimaryAddress(id);
      setAddresses((previous) => previous.map((address) => ({
        ...address,
        principal: address.id === id,
      })));
    }, "Não foi possível definir o endereço principal.");
  }

  async function handleSearchCep() {
    if (cepRequest.current || addressSaveLock.current) return;

    const cep = addressData.cep.trim();
    if (!cepPattern.test(cep)) {
      setAddressError("Informe um CEP com oito dígitos.");
      return;
    }

    const request = new AbortController();
    cepRequest.current = request;
    setSearchingCep(true);
    setAddressError("");

    try {
      const result = await searchAddressByCep(cep, request.signal);
      if (request.signal.aborted) return;

      setAddressData((previous) => {
        const { cep, logradouro, bairro, cidade, estado } = previous;
        const sameLocation = cep.replace("-", "") === result.cep.replace("-", "") &&
          logradouro === result.logradouro && bairro === result.bairro &&
          cidade === result.cidade && estado === result.estado;

        return {
          ...previous,
          ...result,
          latitude: sameLocation ? previous.latitude : null,
          longitude: sameLocation ? previous.longitude : null,
        };
      });

      const coordinates = await searchCoordinatesByCep(result.cep, request.signal)
        .catch(() => null);
      if (request.signal.aborted) return;

      setMapFocus(coordinates);
      if (!coordinates) {
        setAddressError("Não foi possível centralizar o mapa pelo CEP. Você pode marcar a localização no mapa.");
      }
    } catch {
      if (!request.signal.aborted) {
        setAddressError("Não foi possível localizar o CEP. Você pode preencher o endereço manualmente.");
      }
    } finally {
      if (!request.signal.aborted) {
        cepRequest.current = null;
        setSearchingCep(false);
      }
    }
  }

  function handleLocationSelect(latitude: number, longitude: number) {
    if (addressSaveLock.current || cepRequest.current) return;

    setAddressData((previous) => ({
      ...previous,
      latitude: Number(latitude.toFixed(7)),
      longitude: Number(longitude.toFixed(7)),
    }));
  }

  return (
    <div className={s.body}>
      <Navbar />

      <main className={s.main}>
        <h1>Perfil de usuário</h1>

        <p>Gerencie suas informações pessoais, endereços e plano de saúde</p>

        {/* PERFIL */}

        {loadingProfile && <p role="status">Carregando perfil...</p>}
        {profileLoadError && <p className={s.formError} role="alert">{profileLoadError}</p>}
        {userData && (
          <div className={s.userCard}>
            {userData.photo?.trim() && (
              <img src={userData.photo} alt="Foto do usuário" />
            )}

            <div className={s.userInfos}>
              <h1>{userData.name || "Usuário"}</h1>
              <p>{userData.email}</p>
            </div>

            {!profileDraft && (
              <Button type="button" onClick={startProfileEdit} disabled={savingUser !== null}>
                Editar perfil
              </Button>
            )}
          </div>
        )}

        {/* EDIÇÃO DO PERFIL */}

        {profileDraft && (
          <form onSubmit={handleUpdateProfile} className={s.editInfo} noValidate>
            <h1>Editar informações pessoais</h1>

            <p>Altere seus dados e salve quando terminar.</p>

            {profileError && <p className={s.formError} role="alert">{profileError}</p>}

            <fieldset className={s.inputWrapper} disabled={savingUser !== null}>
              <Input
                type="text"
                id="name"
                placeholder="Nome completo"
                value={profileDraft.name}
                onChange={handleChange}
              />

              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                value={profileDraft.email}
                onChange={handleChange}
              />

              <Input
                type="tel"
                id="phone"
                placeholder="Telefone"
                value={profileDraft.phone}
                onChange={handleChange}
              />

              <Input
                type="date"
                id="birthDate"
                value={profileDraft.birthDate}
                aria-label="Data de nascimento"
                onChange={handleChange}
              />

              <Button type="submit">
                {savingUser === "profile" ? "Salvando..." : "Salvar alterações"}
              </Button>

              <Button type="button" onClick={() => setProfileDraft(null)}>
                Cancelar
              </Button>
            </fieldset>
          </form>
        )}

        {/* ENDEREÇO */}

        <section className={s.addressInfo}>
          <div className={s.addressSectionHeader}>
            <div>
              <h1>Meus endereços</h1>

              <p>Gerencie seus endereços cadastrados.</p>
            </div>

            {!isEditingAddress && (
              <Button
                type="button"
                onClick={handleNewAddress}
                disabled={loadingAddresses || addressBusy}
              >
                Adicionar endereço
              </Button>
            )}
          </div>

          {addressListError && (
            <p className={s.formError} role="alert">{addressListError}</p>
          )}
          {addressError && (
            <p className={s.formError} role="alert">
              {addressError}
            </p>
          )}

          {loadingAddresses ? (
            <p role="status">Carregando endereços...</p>
          ) : (
            <>
              {addresses.length === 0 &&
                !isEditingAddress &&
                !addressListError && (
                  <div className={s.emptyAddresses}>
                    <p>Nenhum endereço cadastrado.</p>
                  </div>
                )}

              <div className={s.addressList}>
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    disabled={addressBusy}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                    onSetPrimary={handleSetPrimaryAddress}
                  />
                ))}
              </div>
            </>
          )}

          {isEditingAddress && (
            <form
              key={editingAddressId ?? "new"}
              className={s.addressForm}
              onSubmit={handleAddressSubmit}
              noValidate
            >
              <h2>
                {editingAddressId ? "Editar endereço" : "Novo endereço"}
              </h2>

              <fieldset
                className={s.inputWrapper}
                disabled={addressBusy}
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
                    required
                  />

                  <Button
                    type="button"
                    onClick={handleSearchCep}
                    disabled={addressBusy}
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
                disabled={addressBusy}
              />

              <div className={s.addressFormActions}>
                <Button type="submit" disabled={addressBusy}>
                  {savingAddress ? "Salvando..." : "Salvar endereço"}
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    if (!addressSaveLock.current && !cepRequest.current) resetAddressForm();
                  }}
                  disabled={addressBusy}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </section>
        {/* CONVÊNIO */}

        <section className={s.agreementInfo}>
          <div className={s.texts}>
            <h1>Convênio</h1>

            <p>
              Plano de saúde vinculado para atendimentos rápidos nos hospitais
              credenciados.
            </p>
          </div>

          {convenioLoadError && <p className={s.formError} role="alert">{convenioLoadError}</p>}
          {convenioError && <p className={s.formError} role="alert">{convenioError}</p>}
          {(loadingProfile || loadingConvenios) && <p role="status">Carregando dados do convênio...</p>}
          {profileLoadError && <p>O vínculo com seu convênio está indisponível.</p>}

          {userData && (!isEditingConvenio ? (
            <>
              {userData.convenio ? (
                <div className={s.texts}>
                  <p>NOME DO CONVÊNIO</p>

                  <h1>{userData.convenio.name}</h1>

                  <p>Hospitais credenciados:</p>

                  {userData.convenio.hospitaisAceitos?.map((hospital) => (
                    <p key={hospital}>{hospital}</p>
                  ))}
                </div>
              ) : (
                <p>Nenhum convênio vinculado.</p>
              )}

              {!loadingConvenios && !convenioLoadError && (
                convenios.length > 0 ? (
                  <Button
                    type="button"
                    disabled={savingUser !== null}
                    onClick={() => {
                      resetConvenioSelection();
                      setIsEditingConvenio(true);
                    }}
                  >
                    Editar convênio
                  </Button>
                ) : <p>Nenhum convênio disponível para seleção.</p>
              )}
            </>
          ) : (
            <div className={s.editAgreement}>
              <label htmlFor="convenio">Selecione seu convênio</label>

              <select
                id="convenio"
                value={selectedConvenio}
                disabled={savingUser !== null}
                onChange={(event) => setSelectedConvenio(event.target.value)}
              >
                <option value="">Selecione</option>

                {convenios.map((convenio) => (
                  <option key={convenio.id} value={convenio.id}>
                    {convenio.name}
                  </option>
                ))}
              </select>

              <Button type="button" onClick={handleUpdateConvenio} disabled={!selectedConvenio || savingUser !== null}>
                {savingUser === "convenio" ? "Salvando..." : "Salvar convênio"}
              </Button>

              <Button
                type="button"
                disabled={savingUser === "convenio"}
                onClick={() => {
                  resetConvenioSelection();
                  setIsEditingConvenio(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

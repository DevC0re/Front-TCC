import s from "./AddressCard.module.scss";
import { MapPin, Pencil, Trash2, Star } from "lucide-react";
import type { AddressResponse } from "../../service/addressService";

interface AddressCardProps {
  address: AddressResponse;
  disabled: boolean;
  onEdit: (address: AddressResponse) => void;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

export function AddressCard({
  address,
  disabled,
  onEdit,
  onDelete,
  onSetPrimary,
}: AddressCardProps) {
  return (
    <div className={s.addressCard}>
      <div className={s.addressHeader}>
        <div className={s.addressIcon}>
          <MapPin />
        </div>

        <div className={s.addressInfo}>
          <div className={s.addressTitle}>
            <h2>{address.apelido || "Endereço"}</h2>

            {address.principal && (
              <span className={s.primaryTag}>
                Principal
              </span>
            )}
          </div>

          <p>
            {address.logradouro}, {address.numero}
          </p>

          {address.complemento && (
            <p>{address.complemento}</p>
          )}

          <p>
            {address.bairro} — {address.cidade},{" "}
            {address.estado}
          </p>

          <p>CEP: {address.cep}</p>
        </div>
      </div>

      <div className={s.addressActions}>
        {!address.principal && (
          <button
            type="button"
            className={s.primaryButton}
            disabled={disabled}
            onClick={() => onSetPrimary(address.id)}
          >
            <Star size={16} />
            Definir como principal
          </button>
        )}

        <button
          type="button"
          className={s.editButton}
          disabled={disabled}
          onClick={() => onEdit(address)}
        >
          <Pencil size={16} />
          Editar
        </button>

        <button
          type="button"
          className={s.deleteButton}
          disabled={disabled}
          onClick={() => onDelete(address.id)}
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  );
}

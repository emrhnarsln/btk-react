import { useContext } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import Input from "./Input";
import useInput from "../hooks/useInput";
import {
  isNotEmpty,
  NotHasNumber,
  isEmail,
  isPhoneNumber,
  hasMinLength,
} from "../utils/validations";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearAll } = useContext(CartContext);
  const { data, isLoading, error, SendRequest, resetData } = useFetch(
    "http://localhost:3000/orders",
    config
  );

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleClose() {
    hideCheckout();
    clearAll();
    resetData();
    nameInput.reset();
    emailInput.reset();
    phoneInput.reset();
    addressInput.reset();
    provinceInput.reset();
    districtInput.reset();
  }

  const nameInput = useInput(
    "",
    (value) => NotHasNumber(value) && isNotEmpty(value)
  );
  const emailInput = useInput(
    "",
    (value) => isEmail(value) && isNotEmpty(value)
  );
  const phoneInput = useInput(
    "",
    (value) =>
      isPhoneNumber(value) && isNotEmpty(value) && hasMinLength(value, 11)
  );
  const addressInput = useInput("", (value) => isNotEmpty(value));
  const provinceInput = useInput(
    "",
    (value) => isNotEmpty(value) && NotHasNumber(value)
  );
  const districtInput = useInput(
    "",
    (value) => isNotEmpty(value) && NotHasNumber(value)
  );

  const {
    value: nameValue,
    setValue: setNameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = nameInput;
  const {
    value: emailValue,
    setValue: setEmailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = emailInput;
  const {
    value: phoneValue,
    setValue: setPhoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
  } = phoneInput;
  const {
    value: addressValue,
    setValue: setAddressValue,
    handleInputChange: handleAddressChange,
    handleInputBlur: handleAddressBlur,
    hasError: addressHasError,
  } = addressInput;
  const {
    value: provinceValue,
    setValue: setProvinceValue,
    handleInputChange: handleProvinceChange,
    handleInputBlur: handleProvinceBlur,
    hasError: provinceHasError,
  } = provinceInput;
  const {
    value: districtValue,
    setValue: setDistrictValue,
    handleInputChange: handleDistrictChange,
    handleInputBlur: handleDistrictBlur,
    hasError: districtHasError,
  } = districtInput;

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nameHasError ||
      emailHasError ||
      phoneHasError ||
      addressHasError ||
      provinceHasError ||
      districtHasError
    ) {
      return;
    }

    const customerData = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      address: addressValue,
      province: provinceValue,
      district: districtValue,
    };

    SendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  if (data && !error) {
    setTimeout(() => {
      handleClose();
    }, 2000);
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2>Sipariş Alındı</h2>
        <button
          className="btn btn-sm btn-outline-danger me-2"
          onClick={handleClose}
        >
          Kapat
        </button>
      </Modal>
    );
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p className="text-danger">Sipariş Toplamı: {cartTotal}₺</p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          labelText={"Ad Soyad"}
          id={"name"}
          err={nameHasError && "Geçerli bir isim giriniz"}
          name="name"
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        ></Input>
        <div className="row">
          <div className="col">
            <Input
              labelText={"Email"}
              id={"email"}
              err={emailHasError && "Geçersiz email"}
              name="email"
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            ></Input>
          </div>
          <div className="col">
            <Input
              labelText={"Telefon"}
              id={"phone"}
              err={phoneHasError && "Geçersiz telefon numarası"}
              name="phone"
              type="tel"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
            ></Input>
          </div>
        </div>
        <Input
          labelText={"Adres"}
          id={"address"}
          err={
            addressHasError &&
            "Siparişin adresinize teslimi için önemli, lütfen doldurunuz"
          }
          name="address"
          value={addressValue}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
        ></Input>
        <div className="row">
          <div className="col">
            <Input
              labelText={"İl"}
              id={"province"}
              err={
                provinceHasError &&
                "Siparişin teslimi için bu alanı doğru doldurmanız önemli"
              }
              name="province"
              value={provinceValue}
              onChange={handleProvinceChange}
              onBlur={handleProvinceBlur}
            ></Input>
          </div>
          <div className="col">
            <Input
              labelText={"İlçe"}
              id={"district"}
              err={
                districtHasError &&
                "Siparişin adresinize teslimi için önemli, lütfen doldurunuz"
              }
              name="district"
              value={districtValue}
              onChange={handleDistrictChange}
              onBlur={handleDistrictBlur}
            ></Input>
          </div>
        </div>
        {isLoading ? (
          <div className="alert alert-warning">Butonlar yükleniyor...</div>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={hideCheckout}
            >
              Kapat
            </button>
            <button type="submit" className="btn btn-sm btn-primary me-2">
              Kaydet
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}

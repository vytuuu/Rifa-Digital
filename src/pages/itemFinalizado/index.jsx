import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../globalComponents/navbar";
import { ShoppingCart, Star, TicketIcon } from "lucide-react";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import BtnWhatsapp from './../../globalComponents/btnWhatsapp';

function Item() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setPrice(response.data.price);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [id]);

  const handleAdd = (value) => {
    setQuantity(quantity + value);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };
  return (
    <div>
      <Navbar />
      {product?._id ? (
        <div className="py-6 px-2 bg-zinc-100 justify-center flex">
          <div className="w-[420px] lg:w-[700px]">
          <div className="flex flex-col gap-8 justify-center">
            <div className="flex gap-5">
              <img
                className="rounded-md lg:w-full"
                src={product.image}
              />
            </div>
            <div className="flex flex-col gap-3 h-1/2 font-semibold border-zinc-400 rounded-xl bg-white rounded-md">
              <p className="font-bold lg:text-3xl overflow-hidden border-b-[1px] border-zinc-300 p-2 lg:p-4">
                {product.name}
              </p>
              <span className="flex gap-3 text-gray-500 items-center p-2 lg:p-4">
                Por apenas
                <span className="text-black w-[73px] h-[26px] flex items-center">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-center font-bold">Compartilhar</span>
              <div className="flex gap-2 items-center">
                <a href="">
                  <BsWhatsapp color="green" size={24} />
                </a>
                <a href="">
                  <FaFacebookSquare color="#3B579D" size={24} />
                </a>
                <a href="">
                  <PiTelegramLogo size={24} />
                </a>
                <a href="">
                  <BsTwitterX size={24} />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-white p-10 rounded-md">
              <div className="flex gap-2">
                <TicketIcon />
                <h3 className="font-bold">Bilhetes</h3>
              </div>
              <p>Selecione a quantidade que deseja comprar:</p>
              <div className="grid grid-cols-2 gap-3 font-bold">
                <button
                  className="bg-zinc-400 rounded-md py-2 text-2xl"
                  onClick={() => handleAdd(1)}
                >
                  +1
                </button>
                <button
                  className="bg-zinc-400 rounded-md py-2 text-2xl"
                  onClick={() => handleAdd(5)}
                >
                  +5
                </button>
                <button
                  className="bg-zinc-400 rounded-md py-2 text-2xl"
                  onClick={() => handleAdd(25)}
                >
                  +25
                </button>
                <button
                  className="bg-zinc-400 rounded-md py-2 text-2xl"
                  onClick={() => handleAdd(50)}
                >
                  +50
                </button>
              </div>
              <div className="flex gap-5 items-center justify-center">
                <button
                  className="bg-zinc-200 px-4 rounded-md text-3xl"
                  onClick={handleSubtract}
                >
                  -
                </button>
                <input
                  type="text"
                  className="text-xl w-20 text-center"
                  value={quantity}
                  onChange={handleInputChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <button
                  className="bg-zinc-200 px-4 rounded-md text-3xl"
                  onClick={() => handleAdd(1)}
                >
                  +
                </button>
              </div>
              <button className="flex items-center justify-center gap-3 rounded-md text-white py-3 bg-[#089616]">
                <ShoppingCart />
                Participar
                <span>
                  (
                  {(quantity * price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  )
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-5 bg-white p-10 rounded-md">
              <div className="flex flex-col gap-2 pt-6 ">
                <div className="flex gap-1 ">
                  <Star />
                  <p className="font-semibold">Cotas Premiadas</p>
                </div>
                <p>
                  Cada bilhete vale <b>*valorCotaPremiada*</b>
                </p>
              </div>
              <div className="grid grid-cols-3 grid-rows-2 gap-2 px-10">
                {product.bilhetesPremiados.map((item) => (
                  <p
                    className="p-2 bg-[#089616] text-white text-center rounded-2xl"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      ) : null}
      <BtnWhatsapp />
    </div>
  );
}

export default Item;
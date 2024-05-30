import { Input } from "antd";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-text-mask";

import api from "../../services/api";

import logoImg from "../../assets/fullLogo.svg";
import logo from "../../assets/logo.svg";

import "./styles.css";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelecdetCity] = useState("0");
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState(false);

  const cnpjMask = [
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "/",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
  ];
  const phoneMaskWithDDD = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelecdetCity(city);
  }

  function handleSelectTypeUser(event: ChangeEvent<HTMLSelectElement>) {
    const typeUser = event.target.value;
    console.log(typeUser);
    if (typeUser === "Prefeitura") {
      setUserRole(true);
    } else {
      setUserRole(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    const uf = selectedUf;
    const city = selectedCity;

    const data = {
      name,
      email,
      password,
      cnpj,
      number: whatsapp,
      city,
      uf,
      adm: userRole,
    };

    try {
      await api.post("user", data);
      alert("Cadastro realizado com sucesso!!");
      navigate(`/signIn`);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }
  return (
    <>
      <header>
        <img src={logo} alt="Ecoleta" />
      </header>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
              os melhores lugares para descartar seu lixo.
            </p>
          </section>

          <form onSubmit={handleRegister}>
            <p>Quer se registrar como cidadão ou prefeitura?</p>
            <select onChange={handleSelectTypeUser} className="OptRole">
              <option onChange={() => setUserRole(false)}>Cidadão</option>
              <option onChange={() => setUserRole(true)}>Prefeitura</option>
            </select>
            {userRole ? (
              <>
                <Input
                  placeholder="Nome Fantasia"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="errorMessage">{errorMessage}</p>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputMask
                  mask={cnpjMask}
                  placeholder="Cnpj"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
                <InputMask
                  mask={phoneMaskWithDDD}
                  placeholder="Whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="errorMessage">{errorMessage}</p>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputMask
                  mask={phoneMaskWithDDD}
                  placeholder="Whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </>
            )}
            <div className="input-group">
              <div className="field">
                <select
                  name="uf"
                  title="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                >
                  <label htmlFor="uf" />
                  <option value="0">Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <select
                  name="city"
                  title="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <label htmlFor="city" />
                  <option value="0">Selecione uma Cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="button" type="submit">
              Cadastrar
            </button>
            <Link className="back-link" to="/signIn">
              <FiArrowLeft size={16} color="#2ead65" />
              Voltar para o Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

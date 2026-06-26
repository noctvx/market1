import { useEffect, useState } from "react";

const apiBase = import.meta.env.DEV ? "http://localhost:3333/api" : "/api";
const imageHost = import.meta.env.DEV ? "http://localhost:3333" : "";

const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", seller: "", image_url: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao carregar itens. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setImageFile(files[0]);
      return;
    }
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja realmente retirar este produto da venda?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao retirar o produto da venda.");
      }
      setMessage("Produto retirado da venda com sucesso.");
      fetchItems();
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Erro ao retirar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title || !form.price || !form.seller) {
      setMessage("Preencha título, preço e vendedor.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", parseFloat(form.price.replace(",", ".")));
      formData.append("seller", form.seller);
      if (form.image_url) formData.append("image_url", form.image_url);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(`${apiBase}/items`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar item");
      }
      setForm({ title: "", description: "", price: "", seller: "", image_url: "" });
      setImageFile(null);
      setMessage("Item cadastrado com sucesso!");
      fetchItems();
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Falha ao cadastrar item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <div className="logo-block">
            <strong>Compra e venda</strong>
          </div>
          <nav className="hero-nav">
            <a href="#sell">Vender</a>
            <a href="#products">Produtos</a>
          </nav>
        </div>

        <div className="hero-content">
          <h1>Compra e venda com segurança e apresentação profissional</h1>
          <p>Cadastre produtos com foto ou link, controle seus anúncios e mostre suas ofertas ao público.</p>
        </div>
      </header>

      <main className="container">
        <section id="sell" className="form-panel">
          <div className="panel-header">
            <h2>Vender um item</h2>
            <p>Preencha os dados do produto e anuncie em segundos.</p>
          </div>
          <form className="item-form" onSubmit={handleSubmit}>
            <label>
              Título do anúncio
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Notebook gamer"
              />
            </label>
            <label>
              Descrição
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Ex: Processador i7, 16GB RAM, SSD 512GB"
              />
            </label>
            <label>
              Preço
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Ex: 1299.90"
              />
            </label>
            <label>
              Vendedor
              <input
                type="text"
                name="seller"
                value={form.seller}
                onChange={handleChange}
                placeholder="Ex: Maria Oliveira"
              />
            </label>
            <label>
              URL da imagem
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Cole a URL da imagem aqui"
              />
            </label>
            <label>
              Upload de imagem
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar anúncio"}
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </section>

        <section id="products" className="items-panel">
          <div className="panel-header">
            <h2>Produtos à venda</h2>
            <p>Veja os anúncios mais recentes publicados por vendedores.</p>
          </div>

          {loading && <p className="loading">Carregando itens...</p>}
          {!loading && items.length === 0 && <p className="empty">Nenhum produto disponível.</p>}

          <div className="grid">
            {items.map((item) => {
              const imageSrc =
                item.image_url && item.image_url.startsWith("http")
                  ? item.image_url
                  : item.image_url
                  ? `${imageHost}${item.image_url}`
                  : null;

              return (
                <article key={item.id} className="card">
                  {imageSrc ? (
                    <img className="card-image" src={imageSrc} alt={item.title} />
                  ) : (
                    <div className="card-image card-image--placeholder">Sem imagem</div>
                  )}
                  <div className="card-content">
                    <div className="card-badge">{formatPrice(item.price)}</div>
                    <h3>{item.title}</h3>
                    <p className="description">{item.description || "Sem descrição"}</p>
                    <div className="card-footer">
                      <span>{item.seller}</span>
                      <small>{new Date(item.created_at).toLocaleDateString("pt-BR")}</small>
                    </div>
                    <button className="card-delete" onClick={() => handleDelete(item.id)}>
                      Retirar da venda
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

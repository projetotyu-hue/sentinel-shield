-- Products table for the store
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount INTEGER,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can read products
CREATE POLICY "Anyone can read products" ON public.products
    FOR SELECT USING (true);

-- Only authenticated can insert/update (for admin)
CREATE POLICY "Authenticated can manage products" ON public.products
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert sample products
INSERT INTO public.products (name, description, price, original_price, image_url, category, stock, featured) VALUES
('Smartphone Galaxy A15', 'Smartphone Samsung Galaxy A15 128GB 4G Wi-Fi Tela 6.5" 4GB RAM', 899.00, 1299.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'eletronicos', 50, true),
('Fone de Ouvido Bluetooth', 'Fone de Ouvido JBL Tune 510BT Bluetooth Preto', 199.00, 399.00, 'https://images.unsplash.com/photo-1505740420928-5e560c13ee58?w=400', 'eletronicos', 100, true),
('Cafeteira Elétrica', 'Cafeteira Elétrica Oster 10 Xícaras Preta', 149.00, 249.00, 'https://images.unsplash.com/photo-1517668808822-deed614d7080?w=400', 'casa', 30, false),
('Tênis Esportivo', 'Tênis Nike Revolution 6 Masculino Cinza', 279.00, 449.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'esportes', 80, true),
('Camiseta Básica', 'Camiseta Básica Unissex Algodão Branca', 29.90, 59.90, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'moda', 200, false),
('Smart TV 43"', 'Smart TV LED 43" 4K UHD AOC Android Wi-Fi', 1599.00, 2299.00, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', 'eletronicos', 20, true),
('Kit Cozinha 30 Peças', 'Kit Cozinha 30 Peças Antiaderente Vermelho', 189.00, 349.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 'casa', 40, false),
('Bola de Futebol', 'Bola de Futebol Campo Nike Strike Branca/Preta', 89.90, 149.90, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', 'esportes', 60, false);

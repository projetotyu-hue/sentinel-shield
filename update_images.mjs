// Script to update product image URLs to working Unsplash URLs
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kcjwyfunfjoqkzppkmun.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjand5ZnVuZmpvcWt6cHBrbXVuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY4ODE4NywiZXhwIjoyMDkyMjY0MTg3fQ.CeHjO-SBca3XeHm5vfoswj63OzEmzFDv13h6QRw394A'

const supabase = createClient(supabaseUrl, supabaseKey)

const defaultImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'

const imageMap = {
  'Eletrodomésticos': 'https://images.unsplash.com/photo-1580596411913-07188f972e6a?w=400&h=400&fit=crop',
  'Caixas de Som': 'https://images.unsplash.com/photo-1608043155569-6c4df342dca6?w=400&h=400&fit=crop',
  'Fones de Ouvido': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'Smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  'Smartwatches': 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
  'Notebooks': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  'Tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
  'Consoles': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop'
}

async function updateImages() {
  for (const [category, imageUrl] of Object.entries(imageMap)) {
    const { data, error } = await supabase
      .from('products')
      .update({ image_url: imageUrl })
      .eq('category', category)

    if (error) {
      console.error(`Error updating ${category}:`, error)
    } else {
      console.log(`Updated ${category} products with new image URL`)
    }
  }

  // Update products with null image_url
  const { data: nullImages, error: nullError } = await supabase
    .from('products')
    .select('id')
    .is('image_url', null)

  if (nullError) {
    console.error('Error fetching null images:', nullError)
  } else {
    console.log(`Found ${nullImages?.length || 0} products with null image_url`)
    for (const product of nullImages || []) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: defaultImage })
        .eq('id', product.id)
      if (updateError) console.error(`Error updating null product ${product.id}:`, updateError)
    }
  }

  // Also update any product with old /assets/ prefix
  const { data: oldAssets, error: fetchError } = await supabase
    .from('products')
    .select('id, category')
    .like('image_url', '/assets/%')

  if (fetchError) {
    console.error('Error fetching old assets:', fetchError)
    return
  }

  console.log(`Found ${oldAssets?.length || 0} products with /assets/ images`)

  for (const product of oldAssets || []) {
    const category = product.category
    const newUrl = imageMap[category] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'

    const { error: updateError } = await supabase
      .from('products')
      .update({ image_url: newUrl })
      .eq('id', product.id)

    if (updateError) {
      console.error(`Error updating product ${product.id}:`, updateError)
    }
  }

  console.log('Done!')
}

updateImages()

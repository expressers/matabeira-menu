# Menu Digital — Resort Matabeira

Menu digital do Restaurante & Bar do **Resort Matabeira** (Mussulo, Angola), para abrir por QR code nas mesas.

Projecto Expressers.

## Stack

- React + TypeScript + Vite
- Bun (instalação e scripts)
- Tailwind CSS v4 + shadcn/ui
- Deploy: Render (site estático, ver `render.yaml`)

## Desenvolvimento

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # gera dist/
```

## Actualizar o menu

Todo o conteúdo (pratos, bebidas, preços, contactos) está em `src/data/menu.ts`.
Basta editar esse ficheiro e fazer push para `main`: o Render publica automaticamente.

- `section`: `"restaurante"` ou `"bar"` (define em que separador aparece)
- `tone`: `"dark"` (madeira e dourado) ou `"paper"` (cartão claro, usado nas bebidas)
- `serves`: opcional, ex. `"2 pessoas"`

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Código de verificación</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; text-align: center;">
        
        <h2 style="color: #333;">Verificación de cuenta</h2>

        <p style="color: #555;">
            Hola 👋,
        </p>

        <p style="color: #555;">
            Tu código de verificación es:
        </p>

        <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #2c3e50;">
            {{ $codigo }}
        </div>

        <p style="color: #777; font-size: 14px;">
            Este código expirará pronto. Si no solicitaste esto, puedes ignorar este correo.
        </p>

        <hr style="margin: 30px 0;">

        <p style="font-size: 12px; color: #aaa;">
            © {{ date('Y') }} BKS - Bakery Inventory System
        </p>

    </div>

</body>
</html>
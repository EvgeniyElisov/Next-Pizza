type Props = {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
};

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }: Props) => {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f3f4f6", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <table role="presentation" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f3f4f6", paddingTop: "20px", paddingBottom: "20px" }}>
          <tr>
            <td align="center" style={{ padding: "40px 20px" }}>
              <table
                role="presentation"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  borderCollapse: "collapse",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <tr>
                  <td style={{ backgroundColor: "#ff6b35", padding: "40px 32px", textAlign: "center" }}>
                    <h1 style={{ margin: 0, color: "#ffffff", fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>🍕 TastyShop</h1>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "40px 32px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#10b981",
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <span style={{ fontSize: "36px", color: "#ffffff" }}>✓</span>
                      </div>
                      <h2 style={{ margin: 0, marginBottom: "10px", color: "#1f2937", fontSize: "24px", fontWeight: "600" }}>Заказ успешно оформлен!</h2>
                      <p style={{ margin: 0, color: "#6b7280", fontSize: "16px" }}>Спасибо за ваш заказ</p>
                    </div>

                    <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "24px", marginBottom: "32px", border: "1px solid #e5e7eb" }}>
                      <table role="presentation" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tr>
                          <td style={{ padding: "8px 0" }}>
                            <span style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Номер заказа:</span>
                          </td>
                          <td style={{ padding: "8px 0", textAlign: "right" }}>
                            <span style={{ color: "#1f2937", fontSize: "16px", fontWeight: "600" }}>№{orderId}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} style={{ padding: "12px 0 8px 0", borderTop: "1px solid #e5e7eb" }}></td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px 0" }}>
                            <span style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Сумма заказа:</span>
                          </td>
                          <td style={{ padding: "8px 0", textAlign: "right" }}>
                            <span style={{ color: "#ff6b35", fontSize: "24px", fontWeight: "bold" }}>{totalAmount.toLocaleString("ru-RU")} ₽</span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <a
                        href={paymentUrl}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#ff6b35",
                          color: "#ffffff",
                          textDecoration: "none",
                          padding: "16px 40px",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontWeight: "600",
                          boxShadow: "0 4px 6px rgba(255, 107, 53, 0.3)",
                        }}
                      >
                        Оплатить заказ
                      </a>
                    </div>

                    <p style={{ margin: 0, color: "#6b7280", fontSize: "14px", lineHeight: "1.6", textAlign: "center" }}>
                      Нажмите на кнопку выше, чтобы перейти к оплате заказа.
                      <br />
                      Если кнопка не работает, скопируйте ссылку:
                    </p>
                    <p style={{ marginTop: "10px", marginBottom: 0, textAlign: "center", wordBreak: "break-all" }}>
                      <a href={paymentUrl} style={{ color: "#3b82f6", fontSize: "12px", textDecoration: "none" }}>
                        {paymentUrl}
                      </a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style={{ backgroundColor: "#f9fafb", padding: "32px", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
                    <p style={{ marginBottom: "10px", color: "#6b7280", fontSize: "14px" }}>С уважением, команда Tasty Shop</p>
                    <p style={{ margin: 0, color: "#9ca3af", fontSize: "12px" }}>Это автоматическое письмо, пожалуйста, не отвечайте на него</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

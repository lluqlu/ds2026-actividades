import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { loginSchema, type LoginValidado } from "../schemas/loginSchema";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import type { Sesion } from "../types/sesionType";

function Login() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (datos: LoginValidado) => {
    setErrorApi(null);
    try {
      const sesion = await apiFetch<Sesion>("/auth/login", {
        method: "POST",
        body: JSON.stringify(datos),
      });
      guardarToken(sesion.token);
      navigate("/catalogo");
    } catch (e) {
      // El mensaje real lo trae apiFetch desde el body del backend.
      setErrorApi(e instanceof Error ? e.message : "Error desconocido");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="py-4" style={{ maxWidth: 360 }}>
      <h2 className="mb-4">Ingresar</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="admin@libreria.test"
          {...register("email")}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="••••••••"
          {...register("password")}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando…" : "Ingresar"}
      </Button>
    </Form>
  );
}

export default Login;

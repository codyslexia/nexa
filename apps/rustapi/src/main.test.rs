use actix_web::{test, App};
use serde_json::json;

#[actix_rt::test]
async fn test_status() {
    let mut app = test::init_service(App::new().service(super::status)).await;

    let req = test::TestRequest::get().uri("/status").to_request();
    let resp = test::call_service(&mut app, req).await;

    assert!(resp.status().is_success());

    let body = test::read_body(resp).await;
    let expected_body = json!({
        "code": 200,
        "message": "up"
    });

    assert_eq!(body, serde_json::to_string(&expected_body).unwrap());
}

#[actix_rt::test]
async fn test_not_found() {
    let mut app = test::init_service(App::new().default_service(super::not_found)).await;

    let req = test::TestRequest::get().uri("/not-found").to_request();
    let resp = test::call_service(&mut app, req).await;

    assert!(resp.status().is_client_error());

    let body = test::read_body(resp).await;
    let expected_body = json!({
        "code": 404,
        "message": "Not found"
    });

    assert_eq!(body, serde_json::to_string(&expected_body).unwrap());
}
